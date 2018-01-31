<template>
  <div>
    <div class="title-page">Afastamento para o INSS</div>
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
            <th class="botao" style="min-width: 120px" @click="changeOrder('NomeFuncionario')">
              NOME
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'NomeFuncionario' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'NomeFuncionario' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('CodigoFuncional')">
              CÓD. FUNCIONAL
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'CodigoFuncional' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'CodigoFuncional' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('CodigoJuncao')">
              CÓD. DA JUNÇÃO
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'CodigoJuncao' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'CodigoJuncao' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('DescricaoJuncao')">
              DESCRIÇÃO DA JUNÇÃO
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'DescricaoJuncao' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'DescricaoJuncao' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('NomeGestor')">
              GESTOR
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'NomeGestor' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'NomeGestor' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('EmailGestor')">
              EMAIL GESTOR
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'EmailGestor' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'EmailGestor' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('AfastamentoTipo.Id')">
              TIPO DE AUSÊNCIA
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'AfastamentoTipo.Id' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'AfastamentoTipo.Id' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('DataCriacao')">
              DATA LANÇAMENTO
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'DataCriacao' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'DataCriacao' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('DataInicio')">
              DATA INÍCIO
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'DataInicio' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'DataInicio' && sort[1] == 'desc'"></span>
            </th>
            <th class="botao" @click="changeOrder('DataFim')">
              DATA FIM
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'DataFim' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'DataFim' && sort[1] == 'desc'"></span>
            </th>
            <th>AFASTAMENTO PARA O INSS</th>
            <th>CID</th>
            <th style="font-size: .6em;min-width: 110px">TOTAL DE DIAS AFASTADOS DENTRO DE 60 DIAS</th>
            <th>16º DIA DE AFASTAMENTO</th>
            <th class="botao" @click="changeOrder('Status')">
              STATUS
              <span class="glyphicon glyphicon-chevron-up" v-show="sort[0] == 'Status' && sort[1] == 'asc'"></span>
              <span class="glyphicon glyphicon-chevron-down" v-show="sort[0] == 'Status' && sort[1] == 'desc'"></span>
            </th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="afast in afastamentos">
            <td>{{ afast.Nome }}</td>
            <td>{{ afast.CodigoFuncional }}</td>
            <td>{{ afast.CodigoJuncao }}</td>
            <td>{{ afast.DescricaoJuncao }}</td>
            <td>{{ afast.NomeGestor }}</td>
            <td>{{ afast.EmailGestor }}</td>
            <td>{{ afast.TipoAfastamento }}</td>
            <td>{{ showOnlyDate(afast.DataLancamento) }}</td>
            <td>{{ showOnlyDate(afast.DataInicio) }}</td>
            <td>{{ showOnlyDate(afast.DataFim) }}</td>
            <td>{{ getBoolean(afast.AfastamentoParaInss) }}</td>
            <td>{{ afast.Cid }}</td>
            <td>{{ afast.TotalDiasAfastado }}</td>
            <td>{{ showOnlyDate(afast.DecimoSextoDia) }}</td>
            <td>{{ afast.Status }}</td>
            <td>
              <div class="btn btn-primary" style="font-size: 0.7em; font-weight: bold; padding: 3px 12px;" @click="selecionarAfastamento(afast)">VER</div>
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
        afastamentos: [],
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
      this['getStatus']().then(ret => {
        if(ret.ok){
          me.status = ret.data.Data;
        }
      });
      this.loadData();
    },
    computed: Object.assign({},
      mapGetters(['getToken', 'getOrderListaAfastamento']),
      {
        sort(){
          return this.getOrderListaAfastamento
        }
      }
    ),
    methods: Object.assign({},
      mapActions(['getAfastamentos','getTipoAfastamento', 'getStatus']),
      {
        changeOrder(field){
          if(this.sort[0] == field){
            let dir = this.sort[1] == 'asc' ? 'desc' : 'asc';
            this.$store.commit('SET_ORDER_LISTAAFASTAMENTO', [field, dir]);
          }
          else{
            let dir = this.sort[1];
            this.$store.commit('SET_ORDER_LISTAAFASTAMENTO', [field, dir]);
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
          if(!data){
            return '--'
          }
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
          this['getAfastamentos'](obj).then(ret => {
            if(ret.ok){
              this.afastamentos = ret.data.Data;
            }
          });
        },
        selecionarAfastamento(afast){
          this.$router.push({ name: 'timeline_afastamento', params: { userToken: afast.TokenApp, afastamentoId: afast.AfastamentoId }});
        }
      }
    )
  }
</script>