<template>
  <div id="app">
    <template>
      <section class="nav-container">
        <LineChart :all="data" :start="data[0]" />
      </section>
    </template>
  </div>
</template>



<script>
import LineChart from "./components/LineChart/LineChart.vue";
import chart from "./assets/data/chart.json";

export default {
  name: "App",
  components: {
    LineChart,
  },
  data() {
    return {
      data: chart,
    };
  },
};
</script>


<style lang="stylus">
@import './stylus/reset.styl';
@import './stylus/responsive.styl';
@import './stylus/fonts.styl';
@import './stylus/variables.styl';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}

.nav-container {
  height: calc(100vh - 110px);
}
</style>