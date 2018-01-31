import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);
Vue.use(VueResource);


let myStore = new Vuex.Store({
  actions,
  getters,
  mutations,
  state
});

export default myStore;