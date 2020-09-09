<template>
  <button class="calendar-cell" :data-date="date.day" :class="rootClasses">{{ date.day }}</button>
</template>

<script>
  export default {
    name: 'CalendarCell',
    inheritAttrs: false,
    props: {
      date: {
        required: true,
        type: Object,
      },
      selectedDates: {
        type: Array,
      },
      isSelected: {
        default: false,
        type: Boolean,
      },
      isDisabled: {
        default: false,
        type: Boolean,
      },
      isBetween: {
        default: false,
        type: Boolean,
      },
      isOneDayBefore: {
        default: false,
        type: Boolean,
      },
      isOneDayAfter: {
        default: false,
        type: Boolean,
      },
      isLast: {
        default: false,
        type: Boolean,
      },
      isFirst: {
        default: false,
        type: Boolean,
      },
      isOneDayBeforeFirst: {
        default: false,
        type: Boolean,
      },
      isOneDayBeforeLast: {
        default: false,
        type: Boolean,
      },
      isToday: {
        default: false,
        type: Boolean,
      },
    },
    computed: {
      rootClasses() {
        return {
          '--is-other-month-day': this.date.isOtherMonthDay,
          // "--selected": this.isSelected,
          '--weekend': this.date.isWeekend,
          // "--disabled": this.isDisabled,
          '--isToday': this.date.isToday,
          '--between': this.isBetween,
          '--first': this.isFirst,
          '--last': this.isLast,
          '--one-day-before': this.isOneDayBefore,
          '--one-day-after': this.isOneDayAfter,
          '--one-day-before-first': this.isOneDayBeforeFirst,
          '--one-day-before-last': this.isOneDayBeforeLast,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  $cell-width: 40px;
  $cell-height: 40px;
  $radius: 3px;

  $color-primary: #387fbf;
  $color-accent: #ff8a00;
  $light-gray: #2c2c91;

  .calendar-cell {
    border-radius: 10px;
    border: none;
    appearance: none;
    margin: 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: $cell-height;
    width: $cell-width;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    color: black;
    background-color: transparent;

    &.--between {
      background-color: $light-gray;
      border-radius: 0;
    }
    &.--weekend {
      color: red;
    }
    &.--is-other-month-day:not(.--disabled):not(.--between):not(.--selected) {
      opacity: 0.25;
    }
    &:focus:not(.--selected) {
      outline: none;
    }
    &.--between:focus {
      background-color: darken($light-gray, 3%);
    }
    &.--selected:focus {
      outline: none;
      background-color: darken($light-gray, 10%);
    }
    &.--isToday {
      background-color: black;
      color: white;
    }
  }
</style>
