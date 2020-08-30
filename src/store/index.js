import Vue from 'vue';
import Vuex from 'vuex';
import state from './sampleState';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  // state: {
  //   weatherData: {},
  //   statusBarData: {},
  //   batteryData: {},
  //   alarmData: {},
  //   systemData: {},
  //   musicData: {},
  //   eventData: {},
  //   reminderData: {},
  // },
  mutations: {
    WEATHER_DATA(state, payload) {
      state.weatherData = payload;
    },
    STATUS_BAR_DATA(state, payload) {
      state.statusBarData = payload;
    },
    BATTERY_DATA(state, payload) {
      state.batteryData = payload;
    },
    ALARM_DATA(state, payload) {
      state.alarmData = payload;
    },
    SYSTEM_DATA(state, payload) {
      state.systemData = payload;
    },
    MUSIC_DATA(state, payload) {
      state.musicData = payload;
    },
    EVENT_DATA(state, payload) {
      state.eventData = payload;
    },
    REMINDER_DATA(state, payload) {
      state.reminderData = payload;
    },
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
    },
  },
  modules: {},
});
