import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SwipeRecognizer from './components/SwipeRecognizer';
import fixScrollbehavior from 'smoothscroll-polyfill';
import createUserStyleNode from './util/createUserStyles';
require('../public/config.json');
require('./scss/main.scss');

fixScrollbehavior.polyfill();
createUserStyleNode();

Vue.directive('swipe', SwipeRecognizer);
Vue.config.productionTip = false;

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
