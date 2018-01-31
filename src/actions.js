import Vue from 'vue';

const api = '/folhacertaAPI/api';
const apiApp = '/folhacerta/App';

const actions = {
  changeAlert(store, alert){
    store.commit('UPDATE_ALERT', alert);
  },
  efetuarLogin(store, data){
    let formData = new FormData();
    formData.append('email', data.user);
    formData.append('senha', data.pass);
    formData.append('versaoApp', '1.2.3');
    Vue.http.post(`https://dev.muttuo.com/folhacerta/App/Login`, formData).then(response => {
      let ret = response.data;

      Vue.http.headers.common['token'] = ret.Usuario.TokenApp;
      Vue.http.headers.common['Content-Type'] = 'application/json';

      if(window.localStorage && ret.Usuario.TokenApp){
        window.localStorage.setItem('token', ret.Usuario.TokenApp)
      }

      store.commit('SET_TOKEN', ret.Usuario.TokenApp);
    }, err => {
      console.log(err);
      let token = '34E005DD2FF4E9F987E59F8F256AB33A';

      Vue.http.headers.common['token'] = token;
      Vue.http.headers.common['Content-Type'] = 'application/json';

      if(window.localStorage){
        window.localStorage.setItem('token', token)
      }

      store.commit('SET_TOKEN', token);
      return err
    });
  },
  validarToken(store, token){
    return Vue.http.get(`https://dev.muttuo.com/folhacerta/app/AutorizacaoRemotaJSON?tokenApp=${token}`).then(response => {
      let ret = response.data;
      if(ret.Success){
        Vue.http.headers.common['token'] = ret.Usuario.TokenApp;
        Vue.http.headers.common['Content-Type'] = 'application/json';
        if(window.localStorage && ret.Usuario.TokenApp){
          window.localStorage.setItem('token', ret.Usuario.TokenApp)
        }
        store.commit('SET_TOKEN', ret.Usuario.TokenApp);
      }
      return response.data;
    });
  },
  getCategories(){
    Vue.http.get(`${api}/carregar-categorias`).then(response => {
      console.log(response.data);
    });
  },
  getTimeline(store, id){
    return Vue.http.get(`${api}/listar-timeline-afastamento?Id=${id}`).then(response => {
      return response;
    });
  },
  getDocumentos(store, id){
    return Vue.http.get(`${api}/documentos-afastamento?afastamentoId=${id}`).then(response => {
      return response;
    });
  },
  getTimelineFilters(store, obj){
    return Vue.http.get(`${api}/listar-afastamento-filtro?funcionarioId=${obj.funcionarioId}&dias=${obj.dias}&tipoId=${obj.tipoId}&status=${obj.status}`).then(response => {
      return response;
    });
  },
  getAfastamentos(store, data){
    return Vue.http.post(`${api}/listar-registro-inss`, JSON.stringify(data)).then(response => {
      return response;
    });
  },
  getPendencias(store, data){
    return Vue.http.post(`${api}/listar-pendencias-filtro`, JSON.stringify(data)).then(response => {
      return response;
    });
  },
  getLancamentos(store, data){
    return Vue.http.post(`${api}/listar-lancamentos`, JSON.stringify(data)).then(response => {
      return response;
    });
  },
  getTipoAfastamento(){
    return Vue.http.get(`${api}/carregar-tipo-afastamento?categoriaId=1`).then(response => {
      return response;
    });
  },
  getStatus(){
    return Vue.http.get(`${api}/listar-status-afastamento`).then(response => {
      return response;
    });
  },
  getStatusPendencia(){
    return Vue.http.get(`${api}/listar-pendencias-status`).then(response => {
      return response;
    });
  },
  getTiposDocumento(){
    return Vue.http.get(`${api}/tipos-documento`).then(response => {
      return response;
    });
  },
  getDataUser(store, tkn){
    return Vue.http.get(`/FolhaCerta/app/AutorizacaoRemotaJSON?tokenApp=${tkn}`).then(response => {
      return response;
    });
  },
  getArquivo(store, arquivo){
    return Vue.http.get(`${api}/buscar-arquivo?tag=${arquivo}`).then(response => {
      return response;
    });
  },
  uploadArquivo(store, data){
    return Vue.http.post(`${api}/upload-arquivo?relId=${data.relId}`, data.formData).then(response => {
      return response;
    });
  },
  getDataGraph(store, url){
    return Vue.http.get(`${api}/${url}`).then(response => {
      return response;
    });
  },
  postComunicadoRH(store, formData){
    return Vue.http.post(`${api}/comunicacao-rh`, JSON.stringify(formData)).then(response => {
      return response;
    });
  },
  postDocumento(store, formData){
    return Vue.http.post(`${api}/novo-documento`, JSON.stringify(formData)).then(response => {
      return response;
    });
  },
  postRetornoTrabalho(store, formData){
    return Vue.http.post(`${api}/novo-retorno-trabalho`, JSON.stringify(formData)).then(response => {
      return response;
    });
  },
  postValidar(store, formData){
    return Vue.http.post(`${api}/validar-consulta`, JSON.stringify(formData)).then(response => {
      return response;
    });
  },
  postAgendamentos(store, formData){
    return Vue.http.post(`${api}/agendamento`, JSON.stringify(formData)).then(response => {
      return response;
    });
  },
  postRetorno(store, relId){
    return Vue.http.post(`${api}/nao-retorno-trabalho?relId=${relId}`, null).then(response => {
      return response;
    });
  },
  postCancelarAfastamento(store, relId){
    return Vue.http.post(`${api}/finalizar-afastamento?id=${relId}`, null).then(response => {
      return response;
    });
  },
  postFinalizarAfastamento(store, relId){
    return Vue.http.post(`${api}/finalizar-processo-afastamento?afastamentoId=${relId}`, null).then(response => {
      return response;
    });
  },
  getChatMessages(store, formData){
    return Vue.http.post(`${apiApp}/CarregarMensagensChat`, formData).then(response => {
      return response;
    });
  },
  postChatMessages(store, formData){
    return Vue.http.post(`${apiApp}/CadastrarMensagemChat`, formData).then(response => {
      return response;
    });
  },
  getAfastamentoINSSItem(store, afastamentoId){
    return Vue.http.get(`${api}/listar-cid-inss?afastamentoId=${afastamentoId}`).then(response => {
      return response;
    });
  },
  postStatusCID(store, data){
    return Vue.http.post(`${api}/atualizar-status-inss?id=${data.afastamentoId}&status=${data.status}`, null).then(response => {
      return response;
    }, err => {
      return err;
    });
  },
};

export default actions;