<template>
  <header class="header">
    <nav class="navbar navbar navbar-fixed-top">
      <span class="logo">
        <a href="#" class="img-responsive center-block image-logo"></a>
      </span>
      <span class="btn-right" v-if="getToken">
        <button class="btn btn-link" @click="logout">Sair</button>
      </span>
    </nav>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters(['getToken']),
    methods: {
      logout () {
        this.$store.commit('SET_USER', null);
        this.$store.commit('SET_TOKEN', null);
        if (window.localStorage) {
          window.localStorage.removeItem('user');
          window.localStorage.removeItem('token');
        }
        this.$router.push('/')
      },
    }
  }
</script>