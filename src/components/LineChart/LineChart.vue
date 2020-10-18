<template>
  <div class="line-chart">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="size.x + size.y + size.w + size.h"
    >
      <polyline
        :points="xAxisLine"
        style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 0.2"
      />

      <polyline
        :points="yAxisLine"
        style="fill: none; stroke: #000; stroke-width: 0.2"
      />

      <template v-for="(line, i) in data.data">
        <polyline
          :points="creatLines(line)"
          style="fill: none; stroke-width: 0.3"
          fill="red"
          :style="getColor(i)"
          :key="i"
        />
      </template>

      <g>
        <template v-for="(label, k) in data.labels.y">
          <g :key="k" id="labels-y">
            <text
              :x="calcTextX()"
              :y="calcY(k, 0.5)"
              font-family="Verdana"
              font-size="2"
            >
              {{ label }}
            </text>
            <template v-if="label != '0'">
              <circle :cx="padding.left" :cy="calcY(k, 0)" r=".6" />
              <line
                :x1="padding.left"
                :y1="calcY(k, 0)"
                x2="100"
                :y2="calcY(k, 0)"
                style="stroke: rgba(0, 0, 0, 0.2); stroke-width: 0.2"
              />
            </template>
          </g>
        </template>

        <template v-for="(label, x) in data.labels.x">
          <g :key="x + '-1'" id="labels-x">
            <text :x="calcX(x, 0)" y="100" font-family="Verdana" font-size="1">
              {{ label }}
            </text>
          </g>
        </template>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LineChart",
  components: {},
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
      xAxisLine: "",
      yAxisLine: "",
      size: {
        x: "0 ",
        y: "0 ",
        w: "100 ",
        h: "100 ",
      },
      num: 0,
      data: this.start,
    };
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
      this.data.labels.y = this.data.labels.y.reverse();
      this.range = this.data.range;
    },
  },

  mounted: function () {
    this.data.labels.y = this.data.labels.y.reverse();
    this.range = this.data.range;
    this.xAxisLine =
      this.padding.left +
      ",0 " +
      this.padding.left +
      "," +
      (parseInt(this.size.h) - this.padding.bottom) +
      " " +
      this.padding.left +
      ",0";

    let y = parseInt(this.size.h) - this.padding.bottom;
    this.yAxisLine =
      this.padding.left +
      "," +
      y +
      " " +
      this.padding.left +
      "," +
      y +
      " " +
      "100," +
      y;
  },

  methods: {
    plus() {
      this.num++;
      this.data = this.all[this.num];
    },

    calcDur(i) {
      return i + "s";
    },

    creatLines(rawData) {
      if (!this.range) return;
      let lines = [];

      //ponto incial
      lines.push(
        this.dataToPoint(
          rawData.nome,
          [rawData.dataPoints[0][0], this.range.y.min],
          {
            y: { max: this.range.y.min, min: this.range.y.max },
            x: this.range.x,
          },
          this.padding
        )
      );

      rawData.dataPoints.forEach((points) => {
        lines.push(
          this.dataToPoint(
            rawData.nome,
            points,
            {
              y: { max: this.range.y.min, min: this.range.y.max },
              x: this.range.x,
            },
            this.padding
          )
        );
      });

      //ponto final
      lines.push(
        this.dataToPoint(
          rawData.nome,
          [
            rawData.dataPoints[rawData.dataPoints.length - 1][0],
            this.range.y.min,
          ],
          {
            y: { max: this.range.y.min, min: this.range.y.max },
            x: this.range.x,
          },
          this.padding
        )
      );

      return lines;
    },

    creatLinesAnimate(rawData) {
      if (!this.range) return;
      let lines = [];

      //ponto incial
      lines.push(
        this.dataToPoint(
          rawData.nome,
          [rawData.dataPoints[0][0], this.range.y.min],
          {
            y: { max: this.range.y.min, min: this.range.y.max },
            x: this.range.x,
          },
          this.padding
        )
      );

      rawData.dataPoints.forEach((points) => {
        lines.push(
          this.dataToPoint(
            rawData.nome,
            points,
            {
              y: { max: this.range.y.min, min: this.range.y.max },
              x: this.range.x,
            },
            this.padding,
            0
          )
        );
      });

      //ponto final
      lines.push(
        this.dataToPoint(
          rawData.nome,
          [
            rawData.dataPoints[rawData.dataPoints.length - 1][0],
            this.range.y.min,
          ],
          {
            y: { max: this.range.y.min, min: this.range.y.max },
            x: this.range.x,
          },
          this.padding
        )
      );

      return lines;
    },

    calcTextX() {
      return this.padding.left - 4;
    },

    calcY(index, offset) {
      return (
        ((parseInt(this.size.h) - this.padding.bottom) * index) /
          (this.data.labels.y.length - 1) +
        offset
      );
    },

    calcX(index, offset) {
      return (
        ((parseInt(this.size.w) - this.padding.left) * index) /
          (this.data.labels.x.length - 1) +
        this.padding.left
      );
    },

    getColor(i) {
      let colors = ["#d94628", "#4374df"];
      return {
        stroke: colors[i],
      };
    },

    dataToPoint(name, point, range, padding, change = 1) {
      let sizeW = parseInt(this.size.w) - (padding.right + padding.left);
      let sizeH = parseInt(this.size.h) - (padding.top + padding.bottom);

      let xAxis =
        (sizeW / (range.x.max - range.x.min)) * (point[0] - range.x.min) +
        padding.left;
      let yAxis = null;

      if (change == 0) {
        yAxis = sizeH;
      } else {
        yAxis =
          (sizeH / (range.y.max - range.y.min)) * (point[1] - range.y.min) +
          padding.top / change;
      }

      return [xAxis, yAxis];
    },
  },
};
</script>

<style lang="stylus">
@import '../../stylus/responsive.styl';
@import '../../stylus/variables.styl';

.line-chart {
  svg {
    overflow: visible;
    width: 500px;
  }
}
</style>
