<template>
  <div class="container">
    <div class="events">
      <div v-if="todaysEvents.length">
        <div
          class="event"
          v-for="event in todaysEvents"
          :key="Math.floor(Math.random() * event.startTimeTimestamp)"
          :style="{ backgroundColor: event.associatedCalendarHexColor + 'AA' }"
        >
          <span class="title">
            {{ event.title }}
          </span>
          <div v-if="!event.isAllDay" class="times">{{ event.startTimeTimestamp | toTime }} &ndash; {{ event.endTimeTimestamp | toTime }}</div>
        </div>
      </div>

      <div v-else>
        <span class="title">Nothing scheduled 🎉</span>
      </div>

      <Calendar :locale="locale" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { format, isToday } from 'date-fns';
  import Calendar from '../components/Calendar';
  import locale from '../components/en';
  export default {
    components: {
      Calendar,
    },

    data() {
      return {
        locale
      }
    },
    computed: {
      ...mapState(['battery', 'event']),
      todaysEvents() {
        if (this.event.events) {
          const upcoming = this.event.events.filter((event) => {
            return isToday(new Date(event.date));
          });

          return upcoming.length > 5 ? upcoming.slice(0, 5) : upcoming;
        }
        return [];
      },
    },
    filters: {
      toTime(unixTime) {
        return format(new Date(unixTime * 1000), 'HH:mm');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .event {
    width: 70vw;
    text-align: left;
    padding: 5px;
    border-radius: 5px;
    margin: 5px auto;

    .title {
      font-weight: bold;
    }

    .times {
      font-size: 0.75rem;
    }
  }
</style>
