<template>
  <div class="modal fade" :class="idClass">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">VISUALIZAÇÃO DE ARQUIVO</h4>
        </div>
        <div class="modal-body">
          <div v-for="arquivo in arquivos">
            <div v-if="arquivoPDF(arquivo.Url)" class="boxArquivo">
              <object type="application/pdf" :data="arquivo.Url" width="570" height="400" >
                <a :href="arquivo.Url">Ver</a>
              </object>
            </div>
            <div v-if="!arquivoPDF(arquivo.Url)" class="boxArquivo">
              <img :src="arquivo.Url" />
              <div class="iconDownload">
                <span class="glyphicon glyphicon-save" title="Baixar arquivo" @click="downloadArquivo(arquivo.Url)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props:{
      arquivos:{
        required: true
      },
      idClass:{
        required: true
      }
    },
    methods: Object.assign({},
      mapActions([]),
      {
        arquivoPDF(link){
          let regex = /\.pdf$/;
          return regex.test(link);
        },
        downloadArquivo(link){
          window.open(link);
        }
      }
    )
  }
</script>