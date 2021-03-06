<template>
  <transition appear name="slidein">
    <RenderlessCalendar
      v-slot="{
        getModifiers,
        prevPage,
        nextPage,
        weekDayNames,
        monthNames,
        calendar,
        selectedDates,
        onDateSelect,
      }"
      :weekdayStartsOn="0"
      :locale="locale"
      :default-selected-dates="today"
      @onDateChange="dateChange"
      mode="single"
    >
      <div class="calendar-root" v-swipe.down="dismiss">
        <div
          v-for="view in calendar"
          :key="`${view.month}-${view.year}`"
          class="calendar"
          :data-date-1="selectedDates[0]"
        >
          <div class="calendar__header">
            <span class="calendar__title" style="text-transform: capitalize"
              >{{ monthNames[view.month].full }} {{ view.year }}</span
            >
            <div>
              <button class="calendar__month-btn" @click="prevPage">
                <span class="icon"></span>
              </button>
              <button class="calendar__month-btn" @click="nextPage">
                <span class="icon"></span>
              </button>
            </div>
          </div>
          <div class="calendar__weeks">
            <span
              v-for="day in weekDayNames"
              :key="day.short"
              class="calendar__week-day"
              >{{ day.short }}</span
            >
          </div>
          <div class="calendar__body">
            <CalendarCell
              v-for="date in view.dates"
              :key="date.ms"
              v-bind="getModifiers(date)"
              :date="date"
              @click.native="onDateSelect(date)"
            />
          </div>
        </div>
      </div>
    </RenderlessCalendar>
  </transition>
</template>

<script>
  import { RenderlessCalendar } from 'vue-renderless-calendar/lib/index';
  import CalendarCell from './CalendarCell.vue';
  import { mapMutations, mapState } from 'vuex';
  export default {
    name: 'Calendar',
    components: {
      CalendarCell,
      RenderlessCalendar,
    },
    props: {
      locale: [String, Object],
    },

    computed: {
      ...mapState(['timeTravelDate']),
      today() {
        return [this.timeTravelDate];
      },
    },

    methods: {
      ...mapMutations(['TIME_TRAVEL_DATE']),
      // dismiss the calendar modal.
      dismiss() {
        console.log('dismiss method');
        this.$store.commit('TOGGLE_CAL', false);
      },

      // fires when user selects a date on the calendar modal
      dateChange([payload]) {
        this.$store.commit('TIME_TRAVEL_DATE', payload.formatted);
      },
    },
  };
</script>

<style lang="scss">
  $cell_width: 43px;
  $cell_height: 43px;
  $light_grey: #f7f7f9;

  .calendar-root {
    display: flex;
    position: fixed;
    bottom: 80px;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    backdrop-filter: blur(30px);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: bottom 0.2s ease-in-out;

    @media (prefers-color-scheme: light) {
      background-color: rgba(white, 0.35);
      color: black;
    }
    @media (prefers-color-scheme: dark) {
      background-color: rgba(black, 0.35);
      color: white;
    }
  }

  .calendar {
    position: relative;
    z-index: 2;
    width: calc(#{$cell_width} * 7);
    padding: 10px;
    border-radius: 10px;
    text-shadow: none;

    &__header {
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
      font-weight: 900;
    }

    &__weeks {
      display: flex;
      justify-content: flex-start;
      *::before {
        display: block;
        content: '';
        width: 100%;
        border-top: solid 1px #808080;
      }
    }

    &__week-day {
      display: inline-block;
      width: $cell_width;
      height: 40px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      line-height: 40px;
    }

    &__body {
      max-width: calc(#{$cell_width} * 7);
      min-width: calc(#{$cell_width} * 7);
      justify-content: flex-start;
      display: flex;
      flex-wrap: wrap;
    }

    &__month-btn {
      color: white;
      background: rgba(black, 0.75);
      border: none;

      appearance: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      width: 40px;
      height: 30px;
      &:first-of-type {
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
      }
      &:last-of-type {
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }

      &:focus {
        outline: none;
        background-color: lighten(black, 10%);
      }
    }

    &::before,
    &::after {
      content: '';
      display: block;
      height: 4px;
      position: absolute;
      margin: 0 auto;
      z-index: 1;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &::after {
      width: 95%;
      left: 2.5%;
      opacity: 0.9;
      position: absolute;
      top: 100%;
      background-color: darken(white, 10%);

      @media (prefers-color-scheme: dark) {
        background-color: lighten(black, 20%);
        opacity: 90%;
        backdrop-filter: blur(30px);
      }
    }

    &::before {
      width: 90%;
      left: 5%;
      opacity: 0.8;
      top: calc(100% + 4px);
      background-color: darken(white, 20%);

      @media (prefers-color-scheme: dark) {
        background-color: lighten(black, 10%);
        opacity: 80%;
        backdrop-filter: blur(30px);
      }
    }
  }

  .slidein-enter,
  .slidein-enter-active {
    bottom: -40vh;
  }

  .slidein-leave-to {
    bottom: -40vh;
  }
</style>
