// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLogger from 'vuejs-logger';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueLodash from './lib/lodash';

import App from './App';
import routes from './router';
import store from './store/store';
import filters from './filter';

const logOptions = {
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: 'debug',
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: true,
  // optional : defaults to false if not specified
  showMethodName: true,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: true,
};

// Vue.config.productionTip = false;

Vue.use(VueLodash);
Vue.use(VueLogger, logOptions);
Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue._.forOwn(filters, (filterFn, filterName) => {
  Vue.filter(filterName, filterFn);
});

axios.defaults.baseURL = 'http://localhost:4060/api';
axios.defaults.headers.get.Accepts = 'application/json';

const router = new VueRouter({
  mode: 'history',
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
