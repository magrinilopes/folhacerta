<template>
  <div class="modal fade addComunicadoRH">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Comunicação RH</h4>
        </div>
        <div class="modal-body">
          <div>
            <label>Mensagem RH</label>
            <textarea class="form-control" style="height: 130px; resize: none;" v-model="comunicadoRH"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">FECHAR</button>
          <button type="button" class="btn btn-primary" :class="{disabled: !comunicadoRH}" @click="addComunicadoRH">ADICIONAR</button>
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
        comunicadoRH: ''
      }
    },
    methods: Object.assign({},
      mapActions(['postComunicadoRH']),
      {
        addComunicadoRH(){
          if(this.comunicadoRH){
            let formData = {
              Mensagem: this.comunicadoRH,
              AfastamentoId: this.afastamentoId
            };
            let me = this;
            this['postComunicadoRH'](formData).then(ret => {
              if(ret.ok){
                me.$parent.loadTimeline();
                me.comunicadoRH = '';
                $('.addComunicadoRH').modal('hide');
              }
            });
          }
        }
      }
    )
  }
</script>