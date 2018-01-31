import Vue from 'vue';

import AppComponent from './components/App.vue';
import router from './router';
import store from './store';

require("style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css");
require("bootstrap");
require('style-loader!css-loader!../styles.css');


new Vue({
  el: '#app',
  router,
  store,
  components: {
    'app': AppComponent
  }
});
