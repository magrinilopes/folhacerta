export default [
  {
    path: '/',
    name: 'login',
    component: r => require.ensure([], () => r(require('./components/Login.vue')))
  },{
    path: '/tkn/:token',
    name: 'valida_token',
    component: r => require.ensure([], () => r(require('./components/Valida.Token.vue')))
  },{
    path: '/dashboard',
    name: 'dashboard',
    component: r => require.ensure([], () => r(require('./components/Dashboard.vue')))
  },{
    path: '/todos_lancamentos',
    name: 'todos_lancamentos',
    component: r => require.ensure([], () => r(require('./components/Todos.Lancamentos.vue'))),
    children: [
      {
        path: '',
        name: 'list',
        component: r => require.ensure([], () => r(require('./components/Lista.Lancamentos.vue'))),
      },
      {
        path: ':userToken',
        name: 'timeline',
        component: r => require.ensure([], () => r(require('./components/Timeline.vue'))),
      }
    ]
  },{
    path: '/pendencias',
    name: 'pendencias',
    component: r => require.ensure([], () => r(require('./components/Pendencias.vue'))),
    children: [
      {
        path: '',
        name: 'list_pendencia',
        component: r => require.ensure([], () => r(require('./components/Lista.Pendencias.vue'))),
      },
      {
        path: ':userToken',
        name: 'timeline_pendencia',
        component: r => require.ensure([], () => r(require('./components/Timeline.vue'))),
      }
    ]
  },{
    path: '/afastamento_inss',
    name: 'afastamento_inss',
    component: r => require.ensure([], () => r(require('./components/Afastamento.INSS.vue'))),
    children: [
      {
        path: '',
        name: 'list_afastamento',
        component: r => require.ensure([], () => r(require('./components/Lista.Afastamento.INSS.vue'))),
      },
      {
        path: ':userToken',
        name: 'timeline_afastamento',
        component: r => require.ensure([], () => r(require('./components/Afastamento.INSS.item.vue'))),
      }
    ]
  },{
    path: '*',
    component: r => require.ensure([], () => r(require('./components/Nao.Encontrado.vue'))),
  }
]