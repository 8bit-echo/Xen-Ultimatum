<template>
  <RenderlessCalendar
    v-slot="{
      getModifiers,
      prevPage,
      nextPage,
      weekDayNames,
      monthNames,
      calendar,
    }"
    :locale="locale"
    mode="single"
    @onDateChange="handleDateChange"
  >
    <div class="root">
      <div v-for="view in calendar" :key="`${view.month}-${view.year}`" class="calendar" @click="log(view)">
        <div class="calendar__header">
          <span class="calendar__title" style="text-transform: capitalize">{{ monthNames[view.month].full }} {{ view.year }}</span>
          <div>
            <button class="calendar__month-btn" @click="prevPage">&lt;</button>
            <button class="calendar__month-btn" @click="nextPage">&gt;</button>
          </div>
        </div>
        <div class="calendar__weeks">
          <span v-for="day in weekDayNames" :key="day.short" class="calendar__week-day">{{ day.short }}</span>
        </div>
        <div class="calendar__body">
          <CalendarCell v-for="date in view.dates" :key="date.ms" v-bind="getModifiers(date)" :date="date" />
        </div>
      </div>
    </div>
  </RenderlessCalendar>
</template>

<script>
  import { RenderlessCalendar } from 'vue-renderless-calendar/lib/index';
  import CalendarCell from './CalendarCell.vue';
  export default {
    name: 'Calendar',
    components: {
      CalendarCell,
      RenderlessCalendar,
    },
    props: {
      locale: [String, Object],
    },
    methods: {
      handleDateChange(payload) {},
      log(something) {
        console.log(something);
      },
    },
  };
</script>

<style scoped lang="scss">
  $cell-width: 43px;
  $cell-height: 43px;
  $light-gray: #f7f7f9;

  .root {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: white;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .calendar {
    position: relative;
    z-index: 2;
    width: calc(#{$cell-width} * 7);
    padding: 10px;
    border-radius: 10px;
    text-shadow: none;
    color: black;

    &__header {
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
    }

    &__weeks {
      display: flex;
      justify-content: flex-start;
      *::before {
        display: block;
        content: '';
        width: 100%;
        border-top: solid 1px lightgray;
      }
    }

    &__week-day {
      display: inline-block;
      width: $cell-width;
      height: 40px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      line-height: 40px;
    }

    &__body {
      max-width: calc(#{$cell-width} * 7);
      min-width: calc(#{$cell-width} * 7);
      justify-content: flex-start;
      display: flex;
      flex-wrap: wrap;
    }

    &__month-btn {
      background-color: $light-gray;
      color: white;
      background: black;
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

    &::after {
      content: '';
      display: block;
      width: 95%;
      left: 2.5%;
      // opacity: 0.75;
      background-color: darken(white, 10%);
      height: 4px;
      position: absolute;
      top: 100%;
      margin: 0 auto;
      z-index: 1;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &::before {
      content: '';
      display: block;
      width: 90%;
      left: 5%;
      // opacity: 0.5;
      background-color: darken(white, 20%);
      height: 4px;
      position: absolute;
      bottom: -8px;
      margin: 0 auto;
      z-index: 1;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
</style>
