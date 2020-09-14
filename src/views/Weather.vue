<template>
  <transition appear name="fadein">
    <div class="weather">
      <div class="container" @dblclick="showForecast()">
        <p><WeatherIcon :condition="weather.conditionCode" /></p>
        <div class="conditions">
          <h5 class="temp">&darr;{{ weather.low }}</h5>
          <!-- do not let the next line format. breaks layout on Safari -->
          <h1 class="temp">{{ weather.hasOwnProperty('feelsLike') ? weather.feelsLike : '--' }}</h1>
          <h5 class="temp">&uarr;{{ weather.high }}</h5>
        </div>
        <p>{{ weather.condition }}</p>
      </div>
      <Forecast v-show="showingForecasts" />
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Forecast from '../components/Forecast';
  import WeatherIcon from '../components/WeatherIcon';
  export default {
    name: 'Weather',
    components: {
      Forecast,
      WeatherIcon,
    },
    computed: {
      ...mapState(['weather', 'showingForecasts'])
    },
    methods: {
      ...mapMutations([]),
      // toggles forecast modal
      showForecast() {
        this.$store.commit('TOGGLE_FORECAST', !this.showingForecasts);
      },
    },
  };
</script>
