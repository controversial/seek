import Vue from 'vue';
import './index.html';
import './styles.sass';


window.app = new Vue({
  el: '#app',

  data: {
    hello: 'Hello, world!',
  },
});
