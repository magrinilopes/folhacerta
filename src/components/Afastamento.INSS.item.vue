<template>
  <div style="padding: 20px 10px;">
    <div class="topoFuncionario">
      <div class="row">
        <div class="col-lg-5">
          <div class="imagemTopo">
            <img :src="imageUser" height="50px" class="img-circle" />
            <div class="funcionario">
              <div class="titulo">{{ user.Nome }}</div>
              <div class="descricao">{{ user.Cargo }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-7"></div>
      </div>
    </div>
    <div class="box-aro">
      <div class="dias-afastados" :style="getStyleDiasAfastados()">
        Total de dias afastados nos últimos 60 dias: {{ diasAfastados }}
      </div>
      <div style="text-align: center;" v-if="status != 'Ativo'">
        <div style="color: red; font-size: 1.6em">{{ getTextStatus() }}</div>
        <div>{{ getTextQuem() }}</div>
      </div>
      <div style="text-align: center;" v-if="status == 'Ativo'">
        <div class="btn btn-default" @click="showConfirmacao(1)">ENCAMINHAR PARA O INSS</div>
        <div class="btn btn-default" @click="showConfirmacao(2)" style="margin: 0 10px">NÃO ENCAMINHAR PARA O INSS</div>
        <div class="btn btn-default" @click="showConfirmacao(3)">ENCAMINHAR PARA AVALIAÇÃO MÉDICA</div>
      </div>
    </div>
    <div class="box-aro" v-for="item in listagem">
      <div class="row">
        <div class="col-lg-4">
          <div class="destaque">
            <div>
              <h4 class="uppercase" style="margin-bottom: 3px;">{{ item.Tipo }}</h4>
            </div>
            <div>{{ getDatesItemAusencia(item) }}</div>
            <div>
              <span class="uppercase" :style="getStyleStatus(item.Status)">{{ item.Status }}</span>
            </div>
          </div>
          <div style="margin-top: 15px">
            <ul style="padding-left: 2px;">
              <li style="list-style: none; border-bottom: 1px solid #ddd" v-for="cid in item.Cids">{{ cid }}</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="documento" v-for="doc in item.Imagens">
            <!--div class="title">CID: AS {{ item.Id }}</div-->
            <img :src="doc" width="180" @click="showImage(doc)" />
          </div>
        </div>
      </div>
    </div>
    <modal-exibir-arquivo :arquivos="showImagem" id-class="modalImagem_INSS"></modal-exibir-arquivo>
    <div class="modal fade confirmarStatusINSS">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Confirmação</h4>
          </div>
          <div class="modal-body">
            <p>{{ mensagemConfirmacao }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="closeConfirmacao">CANCELAR</button>
            <button type="button" class="btn btn-primary" @click="setStatusCID">CONFIRMAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';
  import ModalExibirArquivo from './Modal.Exibir.Arquivo.component.vue';

  export default {
    components: {
      'modal-exibir-arquivo': ModalExibirArquivo
    },
    data(){
      return{
        user: {},
        imageUser: '',
        showImagem: [],
        listagem: [],
        diasSemana: [
          'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'
        ],
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
        diasAfastados: 0,
        mensagemConfirmacao: '',
        setStatus: null,
        registroInssId: null,
        status: null,
        quem: null,
        horario: null
      }
    },
    created(){
      if(!this.getToken){
        this.$router.push('/');
      }
      this.userToken = this.$route.params.userToken;
      this.afastamentoId = this.$route.params.afastamentoId;
      this.loadData();
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {
      }
    ),
    methods: Object.assign({},
      mapActions(['getAfastamentoINSSItem', 'getDataUser', 'postStatusCID', 'changeAlert']),
      {
        showConfirmacao(stat){
          this.setStatus = stat;
          if(stat === 1){
            this.mensagemConfirmacao = 'Encaminhar para o INSS?';
          }
          else if(stat === 2){
            this.mensagemConfirmacao = 'Não encaminhar para o INSS?';
          }
          else if(stat === 3){
            this.mensagemConfirmacao = 'Encaminhar para Avaliação Médica?';
          }
          $('.confirmarStatusINSS').modal('show');
        },
        closeConfirmacao(){
          $('.confirmarStatusINSS').modal('hide');
          this.mensagemConfirmacao = '';
          this.setStatus = null;
        },
        getTextStatus(){
          if(this.status){
            if(this.status.toUpperCase() == 'ENCAMINHADO'){
              return "ENCAMINHADO PARA O INSS";
            }
            else if(this.status.toUpperCase() == 'NÃO ENCAMINHADO'){
              return "NÃO ENCAMINHADO PARA O INSS";
            }
            else{
              return 'ENCAMINHADO PARA AVALIAÇÃO MÉDICA'
            }
          }
          return '';
        },
        getTextQuem(){
          let text = '';
          if(this.quem){
            text += this.quem;
          }
          if(this.horario){
            text += ` - ${this.formatDate(this.horario)}`
          }
          return text;
        },
        showImage(img){
          this.showImagem = [{Url: img}];
          $('.modalImagem_INSS').modal('show');
        },
        getStyleDiasAfastados(){
          let obj = {color: '#999999'};
          if(this.status && this.status.toUpperCase() == 'ATIVO'){
            obj = {color: '#00A8DF !important'}
          }
          return obj;
        },
        getStyleStatus(stat){
          let obj = {
            color: 'red'
          };
          if(stat.toUpperCase() == 'EM ANDAMENTO'){
            obj.color = '#ffc719'
          }
          else if(stat.toUpperCase() == 'ATIVO'){
            obj.color = '#40B425';
          }
          return obj;
        },
        formatDate(data){
          let fData = new Date(data);
          let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
          let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
          let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
          return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
        },
        getFormatDateItemAusencia(data){
          let fData = new Date(data);
          let dia = fData.getDate() > 9 ? fData.getDate() : `0${fData.getDate()}`;
          let mes = this.meses[fData.getMonth()];
          let sem = this.diasSemana[fData.getDay()];
          return `${dia} ${mes}, ${sem}`;
        },
        getDatesItemAusencia(item){
          let dataInicio = this.getFormatDateItemAusencia(item.DataInicio);
          let dataFim = this.getFormatDateItemAusencia(item.DataFim);
          return `${dataInicio} - ${dataFim}`
        },
        setStatusCID(){
          let me = this;
          this['postStatusCID']({afastamentoId: this.registroInssId, status: this.setStatus}).then(ret => {
            let obj = {};
            if(ret.ok){
              obj = {
                show: true,
                success: true,
                text: ret.body.Messages ? ret.body.Messages.join(', ') : 'Ok!',
                time: 4000
              };
              me.pegarAfastamentoINSSItem();
            }
            else{
              obj = {
                show: true,
                success: false,
                text: ret.body.Messages ? ret.body.Messages.join(', ') : ret.body.Message ? ret.body.Message : 'Erro na solicitação',
                time: 4000
              }
            }
            me['changeAlert'](obj);
          });
          me.closeConfirmacao();
        },
        pegarDadosUsuario(){
          let me = this;
          this['getDataUser'](this.userToken).then(ret =>{
            if(ret.ok){
              me.user = ret.data.Usuario;
              if(me.user.Foto){
                this.imageUser = `https://folhacerta.s3-us-west-2.amazonaws.com/upload/usuario/fotos/${me.user.Foto}`;
              }
            }
          });
        },
        pegarAfastamentoINSSItem(){
          let me = this;
          this['getAfastamentoINSSItem'](this.afastamentoId).then(ret => {
            if(ret.ok){
              me.listagem = ret.data.Data.Afastamentos;
              me.diasAfastados = ret.data.Data.DiasAfastado;
              me.registroInssId = ret.data.Data.RegistroInssId;
              me.status = ret.data.Data.Status;
              me.quem = ret.data.Data.AcaoQuem;
              me.horario = ret.data.Data.Horario;
            }
          });
        },
        loadData(){
          this.pegarDadosUsuario();
          this.pegarAfastamentoINSSItem();
        }
      }
    )
  }
</script>