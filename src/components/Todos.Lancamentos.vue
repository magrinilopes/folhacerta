<template>
  <router-view></router-view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';

  export default {
    created(){
      if(!this.getToken){
        this.$router.push('/');
      }
    },
    computed: mapGetters(['getToken'])
  }
</script>