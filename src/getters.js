import state from './state';

export default {
  'getToken'(){ return state.appToken },
  'getUser'(){ return state.user },
  'getOrderListaLancamento'(){ return state.orderListaLancamento },
  'getOrderListaPendencia'(){ return state.orderListaPendencia },
  'getOrderListaAfastamento'(){ return state.orderListaAfastamento },
  'getAlertTime': () => { return state.alertTime },
  'getAlertShow': () => { return state.alertShow },
  'getAlertText': () => { return state.alertText },
  'getAlertSuccess': () => { return state.alertSuccess }
}