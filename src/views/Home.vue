<template>
  <transition appear name="fadein">
    <div class="home">
      <div class="container" @dblclick="showForecast()">
        <p><WeatherIcon :condition="weatherData.conditionCode" /></p>
        <div class="conditions">
          <h5 class="temp">&darr;{{ weatherData.low }}</h5>
          <h1 class="temp">{{ weatherData.feelsLike ? weatherData.feelsLike : '--' }}</h1>
          <h5 class="temp">&uarr;{{ weatherData.high }}</h5>
        </div>
        <p>{{ weatherData.condition }}</p>
      </div>
      <Forecast v-show="showingForecasts" />
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Forecast from '../components/Forecast';
  import WeatherIcon from '../components/WeatherIcon';
  // console.log('home loaded');
  export default {
    name: 'Home',
    components: {
      Forecast,
      WeatherIcon,
    },
    computed: {
      ...mapState(['weatherData', 'showingForecasts']),
      remote() {
        return api.apps.applicationForIdentifier('com.apple.TVRemote').icon;
      },
    },
    methods: {
      ...mapMutations([]),
      showForecast() {
        this.$store.commit('TOGGLE_FORECAST', !this.showingForecasts);
      },
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
    opacity: 1;
    font-size: 1.25em;
    // transition: opacity 0.25s ease-out;
  }

  .conditions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fadein-enter {
    opacity: 0;
    &-active {
      transition: opacity 1s ease-out;
    }
  }

  p {
    margin: 0;
  }
</style>
