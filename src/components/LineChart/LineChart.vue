<template>
	<div class="LineChart">
		<svg class="LineChart__Svg" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
			<g>
				<text
					v-for="(label, index) in reverseYLabels"
					:key="`${index}-label-y`"
					:style="fontStyle"
					:x="getLabelYPositionX(label)"
					:y="getLabelYPositionY(index)"
				>
					{{ label }}
				</text>

				<text
					v-for="(label, index) in data.labels.x"
					:key="`${index}-label-x`"
					:style="fontStyle"
					:x="getLabelXPositionX(index)"
					:y="getLabelXPositionY()"
				>
					{{ label }}
				</text>
			</g>

			<!-- <line
				class="LineChart__Guide"
				:x1="padding.left"
				:y1="calcY(k, 0.5)"
				:x2="size.w"
				:y2="calcY(k, 0)"
			/> -->
			<!-- <circle v-if="label !== 0" :cx="padding.left" :cy="calcY(k, 0.5)" r=".5" /> -->

			<polyline class="LineChart__Axis" :points="xAxisLine" />
			<polyline class="LineChart__Axis" :points="yAxisLine" />

			<polyline
				v-for="(line, i) in data.data"
				class="LineChart__Content"
				:key="i"
				:points="creatLines(line)"
				:style="getColor(i)"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'LineChart',
	props: {
		all: {
			type: Array,
			required: true,
		},
		fontSize: {
			type: Number,
			default: 1.5,
		},
	},

	data() {
		return {
			points: [],
			padding: {
				vertical: 3,
				horizontal: 3,
			},
			size: {
				x: 0,
				y: 0,
				w: 100,
				h: 100,
			},
			data: this.all[0],
		}
	},

	computed: {
		reverseYLabels() {
			return this.data.labels.y.slice().reverse()
		},

		marginLeft() {
			return this.padding.horizontal
		},

		marginTop() {
			return this.padding.vertical
		},

		marginRight() {
			return this.size.w - this.padding.horizontal
		},

		marginBottom() {
			return this.size.h - this.padding.vertical
		},

		xAxisLine() {
			return `${this.marginLeft},${this.marginBottom} ${this.marginRight},${this.marginBottom}`
		},

		yAxisLine() {
			return `${this.marginLeft},${this.marginTop} ${this.marginLeft},${this.marginBottom}`
		},

		viewBox() {
			const { h, w, x, y } = this.size
			return `${x} ${y} ${w} ${h}`
		},

		fontStyle() {
			return { fontSize: `${this.fontSize}px` }
		},
	},

	methods: {
		creatLines(rawData) {
			if (!this.data.range) return

			const { nome, dataPoints } = rawData
			const { x, y } = this.data.range
			const range = {
				max: y.min,
				min: y.max,
			}

			return dataPoints.map((points) =>
				this.dataToPoint(nome, points, { y: range, x }, this.padding)
			)
		},

		getLabelYPositionY(index) {
			const { vertical } = this.padding
			const { labels } = this.data
			const total = labels.y.length > 1 ? labels.y.length - 1 : labels.y.length
			const spacing = this.marginTop + this.fontSize / 2

			return ((this.marginBottom - vertical) * index) / total + spacing
		},

		getLabelYPositionX(label) {
			const chars = String(label).length - 1
			const size = Math.floor(this.marginLeft - this.fontSize)
			return chars ? size - chars * 0.5 : size
		},

		getLabelXPositionX(index) {
			const { horizontal } = this.padding
			const { labels } = this.data
			const total = labels.x.length > 1 ? labels.x.length - 1 : labels.x.length
			const spacing = this.marginLeft - this.fontSize / 2

			return ((this.marginRight - horizontal) * index) / total + spacing
		},

		getLabelXPositionY() {
			return this.marginBottom + this.fontSize + 1
		},

		getColor(position) {
			const colors = ['#d94628', '#4374df']
			return {
				stroke: colors[position],
			}
		},

		dataToPoint(name, point, range, padding) {
			const { horizontal, vertical } = padding
			const { w, h } = this.size
			const { x, y } = range

			const sizeW = w - horizontal * 2
			const sizeH = h - vertical * 2

			const xAxis = (sizeW / (x.max - x.min)) * (point[0] - x.min) + horizontal
			const yAxis = (sizeH / (y.max - y.min)) * (point[1] - y.min) + vertical

			return [xAxis, yAxis]
		},
	},
}
</script>

<style lang="stylus">
@import '../../stylus/responsive.styl';
@import '../../stylus/variables.styl';

.LineChart {
	&__Svg{
		overflow: visible;
		width: 800px;
		&--debug{
			background-color: aqua;
		}
	}

	&__Axis{
		fill: none;
		stroke: #000;
		stroke-width: 0.2
	}

	&__Content{
		fill: none;
		stroke-width: 0.3
	}

	// &__Label{
	// 	font-size 2px
	// }

	&__Guide{
		stroke: #dedede;
		stroke-width: 0.2
	}
}
</style>
