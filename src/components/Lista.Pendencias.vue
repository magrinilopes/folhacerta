<template>
  <div>
    <div class="title-page">Todos Lançamentos</div>
    <div>
      <form>
        <div class="row" style="padding: 10px">
          <div class="col-lg-3">
            <div class="form-group">
              <label>Pesquisa</label>
              <input v-model="pesquisa" @change="loadData" class="form-control" placeholder="Nome ou funcional" />
            </div>
            <div class="form-group">
              <label>Tipo de licença</label>
              <select class="form-control" @change="loadData" v-model="tipo">
                <option selected>Selecione...</option>
                <option v-for="licenca in licencas">{{ licenca.Nome }}</option>
              </select>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group">
              <label>Nomes iniciando com as letras</label>
              <input-tag class="form-control" :on-change="changeInitials" :tags="initials"></input-tag>
            </div>
            <div class="form-group">
              <label>Descrição ou cód. da junção</label>
              <input class="form-control" @change="loadData" v-model="juncao" />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group">
              <label>Status</label>
              <select class="form-control" @change="loadData" v-model="statusSelected">
                <option selected>Selecione...</option>
                <option v-for="stat in status" :value="stat.Id">{{ stat.Nome }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>CID</label>
              <input class="form-control" @change="loadData" v-model="cid" />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group">
              <label>Período de</label>
              <input class="form-control" @change="loadData" v-model="data_inicio" placeholder="De" type="date" />
            </div>
            <div class="form-group">
              <label>Período até</label>
              <input class="form-control" @change="loadData" v-model="data_fim" placeholder="Até" type="date" />
            </div>
          </div>
        </div>
      </form>
    </div>
    <div style="overflow-x: auto">
      <table class="table table-stripped table-hover table-todos-lancamentos">
        <thead>
          <tr>
            <th class="botao" style="min-width: 120px" @click="changeOrder('Afastamento.NomeFuncionario')">
              NOME
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'Afastamento.NomeFuncionario' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'Afastamento.NomeFuncionario' && sort[1] == 'desc'"></span>
            </th>
            <th>CÓD. FUNCIONAL</th>
            <th>CÓD. DA JUNÇÃO</th>
            <th class="botao" @click="changeOrder('Afastamento.DescricaoJuncao')">
              DESCRIÇÃO DA JUNÇÃO
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'Afastamento.DescricaoJuncao' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'Afastamento.DescricaoJuncao' && sort[1] == 'desc'"></span>
            </th>
            <th>GESTOR</th>
            <th>EMAIL GESTOR</th>
            <th class="botao" @click="changeOrder('Afastamento.AfastamentoTipo.Id')">
              TIPO DE AUSÊNCIA
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'Afastamento.AfastamentoTipo.Id' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'Afastamento.AfastamentoTipo.Id' && sort[1] == 'desc'"></span>
            </th>
            <th>AGUARDANDO</th>
            <th>PENDÊNCIA</th>
            <th class="botao" @click="changeOrder('DataCriacao')">
              DATA LANÇAMENTO
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'DataCriacao' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'DataCriacao' && sort[1] == 'desc'"></span>
            </th>
            <th>Nº DE DIAS PENDENTES</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pend in pendencias">
            <td>{{ pend.Nome }}</td>
            <td>{{ pend.CodigoFuncional }}</td>
            <td>{{ pend.CodigoJuncao }}</td>
            <td>{{ pend.DescricaoJuncao }}</td>
            <td>{{ pend.NomeGestor }}</td>
            <td>{{ pend.EmailGestor }}</td>
            <td>{{ pend.TipoAfastamento }}</td>
            <td>{{ pend.Aguardando }}</td>
            <td>{{ pend.Pendencia }}</td>
            <td>{{ showOnlyDate(pend.Data) }}</td>
            <td>{{ pend.DiasPendentes }}</td>
            <td>
              <div class="btn btn-primary" style="font-size: 0.7em; font-weight: bold; padding: 3px 12px;" @click="selecionarPendencia(pend)">VER</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import InputTag from 'vue-input-tag';

  export default {
    components:{
      'input-tag': InputTag
    },
    data(){
      return{
        initials: [],
        pendencias: [],
        status: [],
        licencas: [],
        pesquisa: null,
        tipo: null,
        juncao: null,
        statusSelected: null,
        data_inicio: null,
        data_fim: null,
        cid: null,
        max: null
      }
    },
    created(){
      if(!this.getToken){
        this.$router.push('/');
      }
      let me = this;
      this['getTipoAfastamento']().then(ret => {
        if(ret.ok){
          me.licencas = ret.data.Data;
        }
      });
      this['getStatusPendencia']().then(ret => {
        if(ret.ok){
          me.status = ret.data.Data;
        }
      });
      this.loadData();
    },
    computed: Object.assign({},
      mapGetters(['getToken', 'getOrderListaPendencia']),
      {
        sort(){
          return this.getOrderListaPendencia
        }
      }
    ),
    methods: Object.assign({},
      mapActions(['getPendencias','getTipoAfastamento', 'getStatusPendencia']),
      {
        changeOrder(field){
          if(this.sort[0] == field){
            let dir = this.sort[1] == 'asc' ? 'desc' : 'asc';
            this.$store.commit('SET_ORDER_LISTAPENDENCIA', [field, dir]);
          }
          else{
            let dir = this.sort[1];
            this.$store.commit('SET_ORDER_LISTAPENDENCIA', [field, dir]);
          }
          this.loadData();
        },
        getBoolean(val){
          return val ? 'Sim' : 'Não';
        },
        changeInitials(){
          this.loadData();
        },
        formatDataToBackend(data, time){
          if(data && typeof data === 'string'){
            return `${data}T${time}`;
          }
          return null;
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
        getFilters(){
          return {
            "Nome": this.pesquisa,
            "Prefixo": this.initials,
            "Status": this.statusSelected,
            "Tipo": this.tipo,
            "Juncao": this.juncao,
            "Inicio": this.formatDataToBackend(this.data_inicio, '00:00:00'),
            "Fim": this.formatDataToBackend(this.data_fim, '00:00:00'),
            "Cid": this.cid,
            "Sort": this.sort,
            "Max": this.max
          }
        },
        loadData(){
          let obj = this.getFilters();
          this['getPendencias'](obj).then(ret => {
            if(ret.ok){
              this.pendencias = ret.data.Data;
            }
          });
        },
        selecionarPendencia(pend){
          this.$router.push({ name: 'timeline_pendencia', params: { userToken: pend.TokenApp }});
        }
      }
    )
  }
</script>