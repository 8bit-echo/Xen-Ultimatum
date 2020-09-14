import Vue from 'vue';
import Vuex from 'vuex';
import { format } from 'date-fns';
// import sampleState from './sampleState';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weather: {},
    statusBar: {},
    battery: {},
    alarm: {},
    system: {},
    music: {},
    //   nowPlaying: {
    //     title: 'A Clock without a crafstman',
    //     artist: 'Lee McKinney',
    //     album: 'Infinite Mind'
    //   }
    // },
    event: {},
    reminder: {},
    // ...sampleState,
    showingForecasts: false,
    showingCal: false,
    timeTravelDate: format(new Date(), 'YYYY-MM-DD')
  },
  mutations: {
    WEATHER_DATA(state, payload) {
      state.weather = payload;
    },
    STATUS_BAR_DATA(state, payload) {
      state.statusBar = payload;
    },
    BATTERY_DATA(state, payload) {
      state.battery = payload;
    },
    ALARM_DATA(state, payload) {
      state.alarm = payload;
    },
    SYSTEM_DATA(state, payload) {
      state.system = payload;
    },
    MUSIC_DATA(state, payload) {
      state.music = payload;
    },
    EVENT_DATA(state, payload) {
      state.event = payload;
    },
    REMINDER_DATA(state, payload) {
      state.reminder = payload;
    },
    TRACK_PROGRESS(state, payload) {
      state.music = { ...state.music, elapsed: payload };
    },
    TOGGLE_FORECAST(state, payload) {
      state.showingForecasts = payload;
    },
    TOGGLE_CAL(state, payload) {
      state.showingCal = payload;
    },
    TIME_TRAVEL_DATE(state, payload) {
      state.timeTravelDate = payload;
    }
  },
  actions: {
    updateWeather({ commit, state }) {
      commit('WEATHER_DATA', state);
    },
    updateStatusBar({ commit, state }) {
      commit('STATUS_BAR_DATA', state);
    },
    updateBattery({ commit, state }) {
      commit('BATTERY_DATA', state);
    },
    updateAlarm({ commit, state }) {
      commit('ALARM_DATA', state);
    },
    updateSystem({ commit, state }) {
      commit('SYSTEM_DATA', state);
    },
    updateMusic({ commit, state }) {
      commit('MUSIC_DATA', state);
    },
    updateEvent({ commit, state }) {
      commit('EVENT_DATA', state);
    },
    updateReminder({ commit, state }) {
      commit('REMINDER_DATA', state);
    }
  },
  modules: {}
});
