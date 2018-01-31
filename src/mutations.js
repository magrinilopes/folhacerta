const mutations = {
  'SET_TOKEN'(state, token){
    state.appToken = token;
  },
  'SET_USER'(state, data){
    state.user = data;
  },
  'SET_ORDER_LISTALANCAMENTO'(state, data){
    state.orderListaLancamento = data;
  },
  'SET_ORDER_LISTAPENDENCIA'(state, data){
    state.orderListaPendencia = data;
  },
  'SET_ORDER_LISTAAFASTAMENTO'(state, data){
    state.orderListaAfastamento = data;
  },
  'UPDATE_ALERT'(state, data){
    state.alertTime = data.time ? data.time : 2000;
    state.alertText = data.text;
    state.alertSuccess = data.success;
    state.alertShow = data.show;
  }
};

export default mutations;