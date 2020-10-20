<template>
	<div class="LineChart">
		<svg
			class="LineChart__Svg LineChart__Svg--debug"
			:viewBox="`${size.x} ${size.y} ${size.w} ${size.h}`"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g>
				<g v-for="(label, k) in data.labels.y" :key="k" id="labels-y">
					<text class="LineChart__Label" :x="padding.x" :y="calcY(k, 2)">
						{{ label }}
					</text>
					<line class="LineChart__Guide" :x1="padding.left" :y1="calcY(k, 0.5)" x2="100" :y2="calcY(k, 0)" />
					<circle v-if="label !== 0" :cx="padding.left" :cy="calcY(k, 0.5)" r=".5" />
				</g>

				<g v-for="(label, x) in data.labels.x" :key="x + '-1'" id="labels-x">
					<text class="LineChart__Label" :x="calcX(x)" y="100">
						{{ label }}
					</text>
				</g>
			</g>

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
	data() {
		return {
			points: [],
			range: null,
			padding: {
				top: 0,
				right: 0,
				bottom: 3.3,
				left: 5,
			},
			xAxisLine: '',
			yAxisLine: '',
			size: {
				x: 0,
				y: 0,
				w: 100,
				h: 100,
			},
			num: 0,
			data: this.start,
		}
	},

	props: {
		all: {
			type: Array,
			required: true,
		},
		start: {
			type: Object,
			required: true,
		},
	},

	watch: {
		data() {
			this.data.labels.y = this.data.labels.y.reverse()
			this.range = this.data.range
		},
	},

	mounted: function() {
		this.data.labels.y = this.data.labels.y.reverse()
		this.range = this.data.range
		const y = parseInt(this.size.h) - this.padding.bottom

		this.xAxisLine = `${this.padding.left}, 0 ${this.padding.left}, ${y} ${this.padding.left}, 0`
		this.yAxisLine = `${this.padding.left}, ${y} ${this.padding.left}, ${y} 100, ${y}`
	},

	methods: {
		creatLines(rawData) {
			if (!this.range) return

			const { nome, dataPoints } = rawData
			const { x, y } = this.range
			const range = {
				max: y.min,
				min: y.max,
			}

			//initial point

			// lines.push(
			// 	this.dataToPoint(
			// 		rawData.nome,
			// 		[rawData.dataPoints[0][0], this.range.y.min],
			// 		{
			// 			y: { max: this.range.y.min, min: this.range.y.max },
			// 			x: this.range.x,
			// 		},
			// 		this.padding
			// 	)
			// )

			//final point

			// lines.push(
			// 	this.dataToPoint(
			// 		rawData.nome,
			// 		[rawData.dataPoints[rawData.dataPoints.length - 1][0], this.range.y.min],
			// 		{
			// 			y: { max: this.range.y.min, min: this.range.y.max },
			// 			x: this.range.x,
			// 		},
			// 		this.padding
			// 	)
			// )

			return dataPoints.map((points) => this.dataToPoint(nome, points, { y: range, x }, this.padding))
		},

		calcY(index, offset) {
			return ((parseInt(this.size.h) - this.padding.bottom) * index) / (this.data.labels.y.length - 1) + offset
		},

		calcX(index) {
			return ((parseInt(this.size.w) - this.padding.left) * index) / (this.data.labels.x.length - 1)
		},

		getColor(position) {
			const colors = ['#d94628', '#4374df']
			return {
				stroke: colors[position],
			}
		},

		dataToPoint(name, point, range, padding) {
			const { top, left, bottom, right } = padding
			const { w, h } = this.size
			const { x, y } = range

			const sizeW = parseInt(w) - (right + left)
			const sizeH = parseInt(h) - (top + bottom)

			const xAxis = (sizeW / (x.max - x.min)) * (point[0] - x.min) + left
			const yAxis = (sizeH / (y.max - y.min)) * (point[1] - y.min) + top

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
		width: 600px;
		&--debug{
			background-color: red;
			position: relative;
			top: 60px;
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

	&__Label{
		font-size 2px
	}

	&__Guide{
		stroke: #dedede;
		stroke-width: 0.2
	}
}
</style>
