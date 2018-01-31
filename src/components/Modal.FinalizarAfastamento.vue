<template>
  <div class="modal fade modalFinalizarAfastamento">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Confirmação</h4>
        </div>
        <div class="modal-body">
          <div>
            Realmente deseja finalizar o afastamento?
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">CANCELAR</button>
          <button type="button" class="btn btn-primary" @click="finalizarAfastamento">SIM</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props:{
      afastamentoId:{
        required: true
      }
    },
    data(){
      return{
      }
    },
    methods: Object.assign({},
      mapActions(['postFinalizarAfastamento']),
      {
        finalizarAfastamento(){
          let me = this;
          this['postFinalizarAfastamento'](this.afastamentoId).then(ret => {
            if(ret.ok){
              me.$parent.loadTimeline();
              $('.modalFinalizarAfastamento').modal('hide');
            }
          });
        }
      }
    )
  }
</script>