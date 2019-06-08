import Vue from 'vue';
import './index.html';
import './styles.sass';

import './components';

import router from './router';
import store from './vuex';

window.app = new Vue({
  el: '#app',
  router,
  store,

  data: {
    hello: 'Hello, world!',
  },
});
