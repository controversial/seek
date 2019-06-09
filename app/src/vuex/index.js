import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    school: {
      name: 'New Paltz Central High School',
      numStudents: 763,
      logo: '/static/np.png',
    },
  },
});
