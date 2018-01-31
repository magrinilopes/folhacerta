<template>
  <div class="box-login panel panel-danger" v-if="!getToken">
    <div class="panel-heading">
      <h3 class="panel-title">Usuário não autenticado</h3>
    </div>
    <div class="panel-body">
      Você não tem permissão para acessar este sistema
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';

  export default {
    data(){
      return{
      }
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {}
    ),
    methods: Object.assign({},
      mapActions(['logout', 'efetuarLogin']),
      {
        isValid(){
          this.formValid = (this.user && this.user.length >= 6) && (this.pass && this.pass.length >= 6);
        },
        login(){
          if(this.formValid){
            this['efetuarLogin']({user: this.user, pass: this.pass});
          }
        }
      }
    )
  }
</script>