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
        <div class="col-lg-7">
          <div class="row right">
            <div class="col-lg-3">
              <div class="descricao">Admissão</div>
              <div class="titulo">{{ showOnlyDate(user.DataAdmissao) }}</div>
            </div>
            <div class="col-lg-4">
              <div class="descricao">Departamento</div>
              <div class="titulo">{{ user.DescricaoJuncao }}</div>
            </div>
            <div class="col-lg-5">
              <div class="descricao">Gestor</div>
              <div class="titulo">{{ user.NomeGestor }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">AUSÊNCIAS</h3>
          </div>
          <div class="panel-body">
            <form>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Últimos</label>
                    <select class="form-control"  v-model="dias" @change="loadTimelineFilters">
                      <option v-for="dia in ultimosDias" :value="dia.Id">{{ dia.Nome }}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Status</label>
                    <select class="form-control"  v-model="statusSelected" @change="loadTimelineFilters">
                      <option value="0">Todos</option>
                      <option v-for="stat in status" :value="stat.Id">{{ stat.Nome }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Tipos de Ausência</label>
                    <select class="form-control"  v-model="tipo_ausencia" @change="loadTimelineFilters">
                      <option value="0">Todos</option>
                      <option v-for="tipo in tiposAusencia" :value="tipo.Id">{{ tipo.Nome }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="panel-footer botao" v-for="item in itensAusencias" @click="showTimeline(item)">
            <div><h4 class="uppercase">{{ item.AfastamentoTipo.Nome }}</h4></div>
            <div>{{ getDatesItemAusencia(item) }}</div>
            <div><span class="uppercase" style="color: red">{{ getStatusText(item.Status) }}</span></div>
          </div>
        </div>
      </div>
      <div class="col-lg-8" v-show="loadedTimeline">
        <div>
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation"><a href="#timeline" @click="showTabTimeline" class="link_timeline" aria-controls="timeline" role="tab" data-toggle="tab">TIMELINE</a></li>
            <li role="presentation"><a href="#documentos" @click="showTabDocument" aria-controls="documentos" role="tab" data-toggle="tab">DOCUMENTOS</a></li>
            <li role="presentation"><a href="#mensagens" @click="showTabChat" aria-controls="mensagens" role="tab" data-toggle="tab">MENSAGENS</a></li>
            <li style="position: absolute;right: 30px;">
              <ul class="nav navbar-right">
                <li role="presentation" class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    Ações timeline <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li><a href="#" @click.prevent="showComunicadoRH">Comunicado RH</a></li>
                    <li><a href="#" @click.prevent="showDocumentos">Documentos</a></li>
                    <li><a href="#" @click.prevent="showRetorno">Retorno ao Trabalho</a></li>
                    <li><a href="#" @click.prevent="showCancelarAfastamento">Cancelar Afastamento</a></li>
                    <li><a href="#" @click.prevent="showFinalizarAfastamento">Finalizar Afastamento</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <div class="tab-content" style="background-color: #f5f5f5;">
            <div role="tabpanel" class="tab-pane fade" id="timeline">
              <div class="imagemTopo">
                <img :src="imageUser" height="50px" class="img-circle" style="border: 1px solid #999;" />
                <div class="funcionario">
                  <div class="titulo">{{ user.Nome }}</div>
                  <div class="descricao">{{ user.Cargo }}</div>
                </div>
              </div>
              <div class="content-timeline">
                <div class="line-left"></div>
                <div v-for="comp in componentsTimeline">
                  <tipoafastamento v-if="comp.Tipo == 1" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" status=""></tipoafastamento>
                  <documento v-if="comp.Tipo == 2" :rel-id="comp.RelId" :data-icon="comp.Data" :title="comp.Nome" :link="comp.Valor" :tooltip="comp.TooltipRh"></documento>
                  <validacao v-if="comp.Tipo == 3" :afastamento-id="afastamentoId" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor" :tooltip="comp.InstrucaoRh"></validacao>
                  <assinatura v-if="comp.Tipo == 4" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor" :tooltip="comp.TooltipRh"></assinatura>
                  <retorno v-if="comp.Tipo == 5" :rel-id="comp.RelId" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor" :tooltip="comp.TooltipRh"></retorno>
                  <agendamento v-if="comp.Tipo == 6" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor" :tooltip="comp.TooltipRh"></agendamento>
                  <resultado v-if="comp.Tipo == 7" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor"></resultado>
                  <chegada-bebe v-if="comp.Tipo == 8" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao"></chegada-bebe>
                  <saudacao v-if="comp.Tipo == 9" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor"></saudacao>
                  <afastamento-inss v-if="comp.Tipo == 10" :user-token="userToken" :afastamento-id="afastamentoId" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao"></afastamento-inss>
                  <comunicacao-rh v-if="comp.Tipo == 11" :data-icon="comp.Data" :title="comp.Nome" :text="comp.Valor"></comunicacao-rh>
                  <resultado-pericia v-if="comp.Tipo == 12" :rel-id="comp.RelId" :data-icon="comp.Data" :title="comp.Nome" :link="comp.Valor" :tooltip="comp.TooltipRh"></resultado-pericia>
                  <agendamento-pericia v-if="comp.Tipo == 13" :token-app="userToken" :rel-id="comp.RelId" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor" :tooltip="comp.TooltipRh"></agendamento-pericia>
                  <agendamento-exame v-if="comp.Tipo == 14" :token-app="userToken" :rel-id="comp.RelId" :data-icon="comp.Data" :title="comp.Nome" :data="comp.Descricao" :link="comp.Valor" :tooltip="comp.TooltipRh"></agendamento-exame>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="documentos">
              <div style="padding-bottom: 10px; text-align: center;">Estes são os documentos necessários para {{ afastamentoNome }}</div>
              <ul class="list-group">
                <li class="list-group-item" v-for="doc in componentsDocumentos">
                  <span style="font-weight: bold">{{ doc.Nome }}</span>
                  <span v-show="doc.Data"><br>{{ showOnlyDate(doc.Data) }}</span>
                  <span class="documentoStatusOk" v-if="doc.Tag">Ok</span>
                  <span class="documentoStatusPendente" v-if="!doc.Tag">Pendente</span>
                </li>
              </ul>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="mensagens">
              <div v-show="loadingMessages">Atualizando...</div>
              <div v-show="!loadingMessages">
                <div v-show="mensagensChat.length == 0">Não existem mensagens.</div>
                <div v-show="mensagensChat.length > 0">
                  <div v-for="msg in mensagensChat" :style="getStyleBox(msg)">
                    <div class="boxMensagem" :class="{boxMensagemBlue: msg.Usuario.Id == user.Id, boxMensagemGrey: msg.Usuario.Id != user.Id }">
                      <div class="topoMensagem">
                        <span class="donoMensagem">{{ getNomeMensagem(msg) }}</span>
                        <span class="horaMensagem">{{ getDataMensagem(msg.DataHoraEnvio) }}</span>
                      </div>
                      <div class="textoMensagem">{{ msg.Texto }}</div>
                    </div>
                  </div>
                </div>
                <div class="form-inline" style="margin-top: 20px">
                  <input class="form-control" style="width: calc(100% - 45px);" placeholder="Enviar nova mensagem" @keyup.enter="enviarNovaMensagem" v-model="novaMensagem" />
                  <button class="btn btn-default" title="Enviar" @click="enviarNovaMensagem">
                    <span class="glyphicon glyphicon-send"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-comunicadorh :afastamento-id="afastamentoId"></modal-comunicadorh>
    <modal-documentos :afastamento-id="afastamentoId"></modal-documentos>
    <modal-retorno :afastamento-id="afastamentoId"></modal-retorno>
    <modal-cancelarafastamento :afastamento-id="afastamentoId"></modal-cancelarafastamento>
    <modal-finalizarafastamento :afastamento-id="afastamentoId"></modal-finalizarafastamento>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';

  import TipoAfastamento from './TipoAfastamento.component.vue';
  import Documento from './Documento.component.vue';
  import Resultado from './Resultado.component.vue';
  import Validacao from './Validacao.component.vue';
  import Assinatura from './Assinatura.component.vue';
  import Retorno from './Retorno.component.vue';
  import Agendamento from './Agendamento.component.vue';
  import ChegadaBebe from './Chegada.Bebe.component.vue';
  import Saudacao from './Saudacao.component.vue';
  import AfastamentoINSS from './Afastamento.INSS.component.vue';
  import ComunicacaoRH from './Comunicacao.RH.component.vue';
  import ResultadoPericia from './Resultado.Pericia.component.vue';
  import AgendamentoPericia from './Agendamento.Pericia.component.vue';
  import AgendamentoExame from './Agendamento.Exame.Retorno.component.vue';
  import ModalComunicadoRH from './Modal.ComunicadoRH.component.vue';
  import ModalDocumentos from './Modal.Documentos.component.vue';
  import ModalRetorno from './Modal.Retorno.component.vue';
  import ModalCancelarAfastamento from './Modal.CancelarAfastamento.vue';
  import ModalFinalizarAfastamento from './Modal.FinalizarAfastamento.vue';

  export default {
    components:{
      'modal-comunicadorh': ModalComunicadoRH,
      'modal-documentos': ModalDocumentos,
      'modal-retorno': ModalRetorno,
      'modal-cancelarafastamento': ModalCancelarAfastamento,
      'modal-finalizarafastamento': ModalFinalizarAfastamento,
      'tipoafastamento': TipoAfastamento,
      'documento': Documento,
      'resultado': Resultado,
      'validacao': Validacao,
      'assinatura': Assinatura,
      'retorno': Retorno,
      'agendamento': Agendamento,
      'chegada-bebe': ChegadaBebe,
      'saudacao': Saudacao,
      'afastamento-inss': AfastamentoINSS,
      'comunicacao-rh': ComunicacaoRH,
      'resultado-pericia': ResultadoPericia,
      'agendamento-pericia': AgendamentoPericia,
      'agendamento-exame': AgendamentoExame
    },
    data(){
      return{
        user: {},
        componentsTimeline: [],
        tiposAusencia: [],
        comunicadoRH: '',
        status: [],
        imageUser: '../../dist/assets/Icone_Avatar.png',
        ultimosDias: [
          {Id: 0, Nome: 'Hoje'},
          {Id: 7, Nome: '7 Dias'},
          {Id: 15, Nome: '15 Dias'},
          {Id: 30, Nome: '30 Dias'},
          {Id: 60, Nome: '60 Dias'}
        ],
        itensAusencias: [],
        tipo_ausencia: 0,
        statusSelected: 0,
        dias: 0,
        tab: 0,
        afastamentoId: null,
        afastamentoNome: null,
        loadedTimeline: false,
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
        componentsDocumentos: [],
        mensagensChat: [],
        loadingMessages: false,
        novaMensagem: '',
        clearInterval: null
      }
    },
    created(){
      if(!this.getToken){
        this.$router.push('/');
      }
      this.userToken = this.$route.params.userToken;
      this.loadData();
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {
      }
    ),
    methods: Object.assign({},
      mapActions([
        'getTipoAfastamento', 'getStatus', 'getTimeline', 'getTimelineFilters',
        'getDataUser', 'getDocumentos', 'getChatMessages', 'postChatMessages'
      ]),
      {
        getNomeMensagem(msg){
          if(msg.Usuario.Id == this.user.Id){
            return 'Eu';
          }
          else{
            return msg.Usuario.Nome;
          }
        },
        extractTimestamp(data){
          let regex = /[\d]+/g;
          let time = data.match(regex);
          return time ? parseInt(time[0]) : '';
        },
        getDataMensagem(dataText){
          let dataNow = new Date();
          let data = new Date(this.extractTimestamp(dataText));
          let diaNow = dataNow.getDate();
          let diaOntem = dataNow.getDate()-1;
          let diaData = data.getDate();
          let hora = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
          let mins = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
          if(diaNow == diaData){
            return `Hoje, ${hora}:${mins}`;
          }
          else if((diaNow-1) == diaData){
            return `Ontem, ${hora}:${mins}`;
          }
          else{
            let date = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
            return `${date} ${this.meses[data.getMonth()]}, ${hora}:${mins}`;
          }
        },
        getStyleBox(msg){
          if(msg.Usuario.Id == this.user.Id){
            return {'text-align': 'right'};
          }
          else{
            return {'text-align': 'left'};
          }
        },
        enviarNovaMensagem(){
          if(this.novaMensagem){
            let me = this;
            let formData = new FormData();
            formData.append('tokenApp', this.userToken);
            formData.append('tokenAppSolicitante', this.getToken);
            formData.append('texto', this.novaMensagem);
            formData.append('idReferencia', this.afastamentoId);
            this['postChatMessages'](formData).then(ret =>{
              if(ret.ok){
                me.novaMensagem = '';
                me.loadChat();
              }
            })
          }
        },
        showTabTimeline(){
          this.tab = 1;
          this.cancelIntervalChat();
        },
        showTabDocument(){
          this.tab = 2;
          this.cancelIntervalChat();
        },
        cancelIntervalChat(){
          let interval = this.intervalChat
          clearInterval(interval);
          this.intervalChat = null;
        },
        showTabChat(){
          this.tab = 3;
          let me = this;
          me.loadChat();
          if(!this.intervalChat){
            this.intervalChat = setInterval(() =>{
              me.loadChat();
            }, 30000);
          }
        },
        loadChat(){
          if(this.tab === 3){
            this.loadingMessages = true;
            let me = this;
            let formData = new FormData();
            formData.append('tokenApp', this.userToken);
            formData.append('tokenAppSolicitante', this.getToken);
            formData.append('ultimaMensagemChat_id', null);
            formData.append('idReferencia', this.afastamentoId);
            this['getChatMessages'](formData).then(ret =>{
              if(ret.ok){
                me.mensagensChat = ret.data.MensagensChat.sort(function(a, b){
                  return a.Id - b.Id
                });
                me.loadingMessages = false;
              }
            })
          }
        },
        showOnlyDate(data){
          let date = new Date(data);
          let dd = date.getDate();
          let mm = date.getMonth()+1;
          let yyyy = date.getFullYear();
          if(dd<10){
            dd='0'+dd;
          }
          if(mm<10){
            mm='0'+mm;
          }
          return dd+'/'+mm+'/'+yyyy;
        },
        showTimeline(item){
          this.afastamentoId = item.Id;
          this.afastamentoNome = item.AfastamentoTipo.Nome;
          this.loadTimeline();
          this.loadedTimeline = true;
        },
        getStatusText(id){
          let item = this.status.filter(stat => {
            if(stat.Id == id){
              return stat;
            }
          })[0];
          return item.Nome;
        },
        getDatesItemAusencia(item){
          let dataInicio = this.getFormatDateItemAusencia(item.DataInicio);
          let dataFim = this.getFormatDateItemAusencia(item.DataFim);
          return `${dataInicio} - ${dataFim}`
        },
        getFormatDateItemAusencia(data){
          let fData = new Date(data);
          let dia = fData.getDate() > 9 ? fData.getDate() : `0${fData.getDate()}`;
          let mes = this.meses[fData.getMonth()];
          let sem = this.diasSemana[fData.getDay()];
          return `${dia} ${mes}, ${sem}`;
        },
        formatDate(data){
          let fData = new Date(data);
          let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
          let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
          let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
          return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
        },
        showComunicadoRH(){
          $('.addComunicadoRH').modal('show');
        },
        closeComunicadoRH(){
          $('.addComunicadoRH').modal('hide');
        },
        showDocumentos(){
          $('.addDocumentos').modal('show');
        },
        closeDocumentos(){
          $('.addDocumentos').modal('hide');
        },
        showRetorno(){
          $('.addRetorno').modal('show');
        },
        closeRetorno(){
          $('.addRetorno').modal('hide');
        },
        showCancelarAfastamento(){
          $('.modalCancelarAfastamento').modal('show');
        },
        closeCancelarAfastamento(){
          $('.modalCancelarAfastamento').modal('hide');
        },
        showFinalizarAfastamento(){
          $('.modalFinalizarAfastamento').modal('show');
        },
        closeFinalizarAfastamento(){
          $('.modalFinalizarAfastamento').modal('hide');
        },
        loadData(){
          let me = this;
          this['getDataUser'](this.userToken).then(ret => {
            if(ret.ok){
              me.user = ret.data.Usuario;
              if(me.user.Foto){
                this.imageUser = `https://folhacerta.s3-us-west-2.amazonaws.com/upload/usuario/fotos/${me.user.Foto}`;
              }
              me['getTipoAfastamento']().then(ret => {
                if(ret.ok){
                  me.tiposAusencia = ret.data.Data;
                  me.loadStatus();
                }
              });
            }
          });
        },
        loadStatus(){
          let me = this;
          this['getStatus']().then(ret => {
            if(ret.ok){
              me.status  = ret.data.Data;
              me.loadTimelineFilters();
            }
          })
        },
        loadTimeline(){
          let me = this;
          this['getTimeline'](this.afastamentoId).then(ret => {
            if(ret.ok){
              me.componentsTimeline = ret.data.Data.Componentes;
              setTimeout(() => {
                $('.link_timeline').tab('show');
              }, 100);
            }
          });
          this['getDocumentos'](this.afastamentoId).then(ret => {
            if(ret.ok){
              console.log(ret.data);
              me.componentsDocumentos = ret.data.Data;
            }
          });
        },
        loadTimelineFilters(){
          let me = this;
          let obj = {
            funcionarioId: this.user.Id,
            dias: this.dias,
            tipoId: this.tipo_ausencia,
            status: this.statusSelected
          };
          this['getTimelineFilters'](obj).then(ret => {
            if(ret.ok){
              me.itensAusencias = ret.data.Data;
            }
          });
        }
      }
    )
  }
</script>