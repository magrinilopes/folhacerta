<template>
  <div class="component-timeline">
    <span class="icon" style="margin-top: 0;">
      <span class="glyphicon glyphicon-file" style="color: #999999"></span>
    </span>
    <div class="description">
      <span class="timeline-date">{{ formatDate(dataIcon) }}</span>
      <div>
        <div class="timeline-title">{{ title }}</div>
        <div>
          <div class="btn btn-default" v-if="link" :title="tooltip" @click="verDocumento">VER</div>
          <div v-if="!link">
            <input type="file" name="files" id="files" accept=".pdf,image/*" class="inputfile" multiple @change="anexarDocumento">
            <label for="files">
              <div :title="tooltip" class="btn btn-default">ANEXAR</div>
              <span v-show="loading">Carregando...</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <modal-exibir-arquivo :arquivos="arquivos" :id-class="classeArquivo"></modal-exibir-arquivo>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import ModalExibirArquivo from './Modal.Exibir.Arquivo.component.vue';

  export default {
    components: {
      'modal-exibir-arquivo': ModalExibirArquivo
    },
    props: {
      relId: {
        type: Number,
        required: true
      },
      dataIcon:{
        type: String
      },
      title:{
        type: String,
        required: true
      },
      link:{
        type: String
      },
      tooltip:{
        type: String
      }
    },
    data(){
      return{
        meses: {
          0: 'JAN',
          1: 'FEV',
          2: 'MAR',
          3: 'ABR',
          4: 'MAI',
          5: 'JUN',
          6: 'JUL',
          7: 'AGO',
          8: 'SET',
          9: 'OUT',
          10: 'NOV',
          11: 'DEZ',
        },
        files: [],
        loading: false,
        classeArquivo: '',
        arquivos: []
      }
    },
    created(){
      this.classeArquivo = `arquivo_${this.relId}`;
    },
    methods: Object.assign({},
      mapActions(['uploadArquivo', 'getArquivo']),
      {
        formatDate(data){
          let fData = new Date(data);
          let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
          let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
          let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
          return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
        },
        verDocumento(){
          let me = this;
          this['getArquivo'](this.link).then(ret => {
            if(ret.ok){
              me.arquivos = ret.data.Data;
              $(`.arquivo_${this.relId}`).modal('show');
            }
          });
        },
        anexarDocumento(e){
          let me = this;
          let file = e.target.files || e.dataTransfer.files;
          Array.from(file).forEach(fl => {
            this.files.push(fl);
          });
          let formData = new FormData();
          this.files.forEach(file => {
            formData.append('files', file);
          });

          this.loading = true;

          this['uploadArquivo']({relId: this.relId, formData: formData}).then(ret => {
            console.log(ret);
            me.loading = false;
            this.$parent.loadTimeline();
          })
        },
      }
    )
  }
</script>