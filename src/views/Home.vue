<template>
  <div class="home">
    <div class="container">
      <p><img :src="weatherIcon" :alt="weatherData.condition"/></p>
      <div class="conditions">

        <h5>&darr;{{ weatherData.low }}</h5>
        <h1>{{ weatherData.feelsLike ? weatherData.feelsLike : '--' }}</h1>
        <h5>&uarr;{{ weatherData.high }}</h5>
      </div>
      <p>{{ weatherData.condition }}</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  console.log('home loaded');
  export default {
    name: 'Home',
    data() {
      return {};
    },
    computed: {
      ...mapState(['weatherData']),
      weatherIcon() {
        return require(`../assets/Klear/${this.weatherData.conditionCode}.png`);
      },
    },
    methods: {
      ...mapMutations([]),
    },
  };
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -10vmin;
    font-size: 1.25em;
  }
  .conditions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > * {
      margin: 0 1rem;
      &::after {
        position: absolute;
        content: '°';
      }
    }
  }
  p {
    margin: 0;
  }
</style>
