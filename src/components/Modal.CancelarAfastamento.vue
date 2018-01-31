<template>
  <div class="modal fade modalCancelarAfastamento">
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
            Realmente deseja cancelar o afastamento?
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">CANCELAR</button>
          <button type="button" class="btn btn-primary" @click="cancelarAfastamento">SIM</button>
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
      mapActions(['postCancelarAfastamento']),
      {
        cancelarAfastamento(){
          let me = this;
          this['postCancelarAfastamento'](this.afastamentoId).then(ret => {
            if(ret.ok){
              me.$parent.loadTimeline();
              $('.modalCancelarAfastamento').modal('hide');
            }
          });
        }
      }
    )
  }
</script>