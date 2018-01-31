<template>
  <div class="box-login panel" :class="{'panel-info': success, 'panel-danger': !success && processado}" v-if="!getToken">
    <div class="panel-heading">
      <h3 class="panel-title">Autenticação</h3>
    </div>
    <div class="panel-body">
      {{ mensagem }}
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';

  export default {
    data(){
      return{
        success: false,
        processado: false,
        mensagem: 'Validando Token...'
      }
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {}
    ),
    created(){
      let token = this.$route.params.token;
      if(token){
        this.login(token);
      }
      else{
        this.processado = true;
        this.mensagem = 'Token inválido!';
      }
    },
    methods: Object.assign({},
      mapActions(['validarToken']),
      {
        login(token){
          this['validarToken'](token).then(ret => {
            if(ret.Success){
              this.$router.push('/')
            }
            else{
              this.mensagem = ret.Error;
            }
          });
        }
      }
    )
  }
</script>