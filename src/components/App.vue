<template>
  <div class="app">
    <fc-header></fc-header>
    <section>
      <div class="menu-list visible-lg-inline-block" v-if="getToken">
        <fc-menu :items="menulist"></fc-menu>
      </div>
      <div :class="{content: getToken, login: !getToken}">
        <router-view class="panel panel-default"></router-view>
      </div>
    </section>
    <fc-alert :top="60"></fc-alert>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import Header from './Header.vue';
  import Menu from './Menu.vue';
  import Alerta from './Alert.vue';

  export default {
    name: 'App',
    components: {
      'fc-header': Header,
      'fc-menu': Menu,
      'fc-alert': Alerta
    },
    data () {
      return {
        menulist: [
          {text: 'Dashboard', route: '/dashboard', disabled: false},
          {text: 'Todos Lançamentos', route: '/todos_lancamentos', disabled: false},
          {text: 'Pendências', route: '/pendencias', disabled: false},
          {text: 'Afastamento para o INSS', route: '/afastamento_inss', disabled: false}
        ]
      }
    },
    watch:{
      getToken: 'validateToken'
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {

      }
    ),
    created(){
      let token = this.getTokenSaved();
      if(token){
        Vue.http.headers.common['token'] = token;
        Vue.http.headers.common['Content-Type'] = 'application/json';
        this.$store.commit('SET_TOKEN', token);
      }
    },
    methods: Object.assign({},
      {
        validateToken(token){
          if(!token){
            this.$router.push({name: 'login'});
          }
        },
        getQueryString () {
          let result = {};
          if (location.search.length > 0) {
            let pairs = (location.search).slice(1).split('&');
            for (let idx in pairs) {
              let pair = pairs[idx].split('=');
              if (!!pair[0]) {
                result[pair[0].toLowerCase()] = decodeURIComponent(pair[1] || '')
              }
            }
          }
          return result;
        },
        getCookies(){
          let cookies = document.cookie;
          if (cookies) {
            cookies = cookies.replace(/\;[ ]/gi, '","');
            cookies = '{"' + cookies.replace(/\=/gi, '":"') + '"}';
            return JSON.parse(cookies)
          }
          return {};
        },
        getLocalStorage(){
          if(window.localStorage){
            return window.localStorage.getItem('token');
          }
          return false;
        },
        getTokenSaved () {
          let tokenStorage = this.getLocalStorage();
          if(!tokenStorage){
            let allQueryString = this.getQueryString();
            let allCookies = this.getCookies();
            return allQueryString['token'] ? allQueryString['token'] : allCookies['token'];
          }
          else{
            return tokenStorage;
          }
        }
      }
    )
  }
</script>
