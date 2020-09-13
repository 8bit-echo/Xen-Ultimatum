import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SwipeRecognizer from './components/SwipeRecognizer';
import fixScrollbehavior from 'smoothscroll-polyfill';
require('../public/config.json');
require('./scss/main.scss');

fixScrollbehavior.polyfill();

Vue.directive('swipe', SwipeRecognizer);
Vue.config.productionTip = false;

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

const style = document.createElement('style');
style.innerHTML = `a.router-link-exact-active {color: ${window.config.accentColor} !important;}`;
document.head.appendChild(style);
