<template>
  <div class="modal fade addRetorno">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">RETORNO AO TRABALHO</h4>
        </div>
        <div class="modal-body">
          <div>
            <label>Data do retorno</label>
            <input type="date" class="form-control" v-model="data_retorno">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">FECHAR</button>
          <button type="button" class="btn btn-primary" :class="{disabled: !data_retorno}" @click="addRetorno">ADICIONAR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props:{
      afastamentoId: {
        required: true
      }
    },
    data(){
      return{
        data_retorno: ''
      }
    },
    methods: Object.assign({},
      mapActions(['postRetornoTrabalho']),
      {
        formatDataToBackend(data, time){
          if(data && typeof data === 'string'){
            return `${data}T${time}`;
          }
          return null;
        },
        addRetorno(){
          let obj = {
            AfastamentoId: this.afastamentoId,
            Data: this.formatDataToBackend(this.data_retorno, '00:00:00')
          };
          let me = this;
          this['postRetornoTrabalho'](obj).then(ret => {
            if(ret.ok){
              me.$parent.loadTimeline();
              me.data_retorno = '';
              $('.addRetorno').modal('hide');
            }
          });
        }
      }
    )
  }
</script>