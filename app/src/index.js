/* global GRAPHQL_URI */
/* eslint-disable import/first, import/order */

import Vue from 'vue';
import './index.html';
import './styles.sass';

import './components';

import router from './router';
import store from './vuex';

import ApolloClient from 'apollo-boost';
const apolloClient = new ApolloClient({
  uri: GRAPHQL_URI,
});

import VueApollo from 'vue-apollo';
Vue.use(VueApollo);
const apolloProvider = new VueApollo({ defaultClient: apolloClient });


window.app = new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,

  data: {
    hello: 'Hello, world!',
  },
});
