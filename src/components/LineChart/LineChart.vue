<template>
  <div class="line-chart">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="size.x + size.y + size.w + size.h">
      <polyline :points="xAxisLine" style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 0.2;"></polyline>
      <polyline :points="yAxisLine" style="fill:none;stroke:#000;stroke-width:.2"></polyline>
      <template v-for="(line, i) in data.data">
        <polygon points="" style="fill:none;stroke-width:.3" fill="red" :style="getColor(i)" :key="i">
            <animate attributeName="points" :dur="calcDur(i)" fill="freeze" 
                :from="creatLinesAnimate(line)"
                :to="creatLines(line)"
            />
        </polygon>
      </template>
      <g>
        <template v-for="(label, k) in data.labels.y">
          <g :key="k" id="labels-y">
            <text :x="calcTextX()" :y="calcY(k, .5)" font-family="Verdana" font-size="2">{{label}}</text>
            <template v-if="label != '0'">
              <circle :cx="padding.left" :cy="calcY(k, 0)" r=".6"/>
              <line :x1="padding.left" :y1="calcY(k, 0)" x2="100" :y2="calcY(k, 0)" style="stroke:rgba(0,0,0, .2);stroke-width:.2" />
            </template>
          </g>
        </template>
        <template v-for="(label, x) in data.labels.x">
          <g :key="x + '-1'" id="labels-x">
            <text :x="calcX(x, 0)" y="100" font-family="Verdana" font-size="1">{{label}}</text>
          </g>
        </template>
      </g>
    </svg>
  </div>

</template>

<script src="./LineChart.js"></script>
<style src="./lineChart.styl" lang="stylus"></style>
