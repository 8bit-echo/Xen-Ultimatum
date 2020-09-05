<template>
  <transition name="slideup">
    <div class="forecast-sheet" @dblclick="$store.commit('TOGGLE_FORECAST', false)">
      <div class="pages">
        <section class="page">
          <h3>Hourly</h3>
          <div class="contents">
            <div class="weather-info" v-for="hour in weatherData.hourlyForecasts.slice(0, 5)" :key="hour.time">
              <WeatherIcon :condition="hour.conditionCode" />
              <span class="temp">{{ hour.temperature }}</span>
              <div class="pill" :style="{ background: bgFromTemp(hour.temperature) }"></div>
              {{ hour.time | removeZeros }}
            </div>
          </div>
        </section>

        <section class="page">
          <h3>Daily</h3>
          <div class="contents">
            <div class="weather-info" v-for="day in weatherData.dayForecasts.slice(0, 5)" :key="day.dayNumber">
              <WeatherIcon :condition="day.icon" />
              <span class="temp">{{ day.high }}</span>
              <div class="pill">
                <div class="high indicator" :style="{ bottom: positionFromTemp(day.high) }"></div>
                <div class="low indicator" :style="{ bottom: positionFromTemp(day.low) }"></div>
              </div>
              <span class="temp">{{ day.low }}</span>
            </div>
          </div>
        </section>
      </div>

      <nav class="tabnav">
        · ·
      </nav>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex';
  import WeatherIcon from './WeatherIcon';
  export default {
    name: 'Forecast',
    components: {
      WeatherIcon,
    },

    data() {
      return {
        page: 0,
      };
    },
    computed: {
      ...mapState(['weatherData', 'showingForecasts']),
      fiveDayMax() {
        return Math.max(...this.weatherData.dayForecasts.slice(0, 5).map((day) => day.high));
      },
      fiveDayMin() {
        return Math.min(...this.weatherData.dayForecasts.slice(0, 5).map((day) => day.low));
      },
    },

    filters: {
      removeZeros(time) {
        return time.replace(':00', '');
      },
    },

    methods: {
      bgFromTemp(temp) {
        const percent = parseFloat((((temp - this.fiveDayMin) / (this.fiveDayMax - this.fiveDayMin)) * 100).toFixed(1));
        return `linear-gradient(0deg, white 0%, white ${percent}%, transparent ${percent + 0.01}%, transparent 100%)`;
      },

      positionFromTemp(temp) {
        const percent = parseFloat((((temp - this.fiveDayMin) / (this.fiveDayMax - this.fiveDayMin)) * 100).toFixed(1));
        return `${percent}%`;
      },
    },
  };
</script>

<style lang="scss">
  .forecast-sheet {
    font-size: 0.75rem;
    overflow: hidden;
    color: white;
    position: absolute;
    bottom: 80px;
    padding: 1rem;
    border-radius: 1.5rem;
    width: 90vw;
    // height: 30vh;
    margin: auto;
    background-color: rgba(black, 0.4);
    backdrop-filter: blur(30px);
    text-shadow: none;

    @media (prefers-color-scheme: light) {
      background-color: rgba(white, 0.25);
      color: black;
    }
  }

  .pages {
    // border: solid 1px white;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    overflow-x: scroll;
    overflow-y: auto;
  }

  .page {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100%;
    padding: 0 0.75rem;
  }

  h3 {
    margin: 10px;
    font-size: 1rem;
  }

  .contents {
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
  }

  .pill {
    height: 100px;
    width: 10px;
    border: solid 0.75px white;
    border-radius: 5px;
    margin: 5px auto;
    position: relative;
    overflow: visible;

    .indicator {
      position: absolute;
      width: 15px;
      left: -3px;
      height: 2px;
      background-color: white;

      &.low {
        background-color: dodgerblue;
      }

      &.high {
        background-color: orange;
      }
    }
  }
</style>
