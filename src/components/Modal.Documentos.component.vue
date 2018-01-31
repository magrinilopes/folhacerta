<template>
  <div class="modal fade addDocumentos">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">DOCUMENTOS</h4>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-lg-6">
              <label>Tipo de documento</label>
              <select class="form-control" v-model="tipo_documento">
                <option disabled selected value="">Selecione...</option>
                <option v-for="tipo in tiposDocumento" :value="tipo.Id">{{ tipo.Nome }}</option>
              </select>
            </div>
            <div class="col-lg-6">
              <label>Quem deve anexar</label>
              <select class="form-control" v-model="quem_anexa">
                <option disabled selected value="">Selecione...</option>
                <option v-for="quem in quemDeveAnexar" :value="quem.Id">{{ quem.Nome }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">FECHAR</button>
          <button type="button" class="btn btn-primary" :class="{disabled: !tipo_documento || !quem_anexa}" @click="addDocumentos">ADICIONAR</button>
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
        tiposDocumento: [],
        quemDeveAnexar: [
          {Id: 1, Nome: 'Funcionário'},
          {Id: 2, Nome: 'Gestor'}
        ],
        tipo_documento: '',
        quem_anexa: '',
        instrucao_funcionario: '',
        instrucao_gestor: ''
      }
    },
    created(){
      let me = this;
      this['getTiposDocumento']().then(ret => {
        me.tiposDocumento = ret.data.Data;
      });
    },
    methods: Object.assign({},
      mapActions(['getTiposDocumento', 'postDocumento']),
      {
        resetValues(){
          this.tipo_documento = '';
          this.quem_anexa = '';
          this.instrucao_funcionario = '';
          this.instrucao_gestor = '';
        },
        addDocumentos(){
          let obj = {
            AfastamentoId: this.afastamentoId,
            Tipo: this.tipo_documento,
            FuncionarioInfo: this.instrucao_funcionario,
            GestorInfo: this.instrucao_gestor,
            Responsavel: this.quem_anexa
          };
          let me = this;
          this['postDocumento'](obj).then(ret => {
            if(ret.ok){
              me.$parent.loadTimeline();
              me.resetValues();
              $('.addDocumentos').modal('hide');
            }
          });
        }
      }
    )
  }
</script>