<template>
  <div class="panel-graph">
    <div class="dash-graph">
      <span class="title-graph">FUNCIONÁRIOS</span>
      <span>(%)</span>
      <div class="graph" id="graph_funcionarios"></div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';

  export default {
    data(){
      return{
        chartLine: {},
        colors: ['#DA0011', '#1741A2', '#4E4E54', '#00C233'],
        dataGraph: [],
        amGraphs: []
      }
    },
    created(){
      let me = this;
      setTimeout(() => {
        me.loadGraph();
      }, 1000)
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {
      }
    ),
    methods: Object.assign({},
      mapActions(['getDataGraph']),
      {
        loadGraph(){
          let me = this;
          this['getDataGraph']('grafico-funcionarios').then(ret => {
            if(ret.ok){
              me.treatDataGraph(ret.data.Data);
            }
          })
        },
        treatDataGraph(data){
          let totalAtivo = (100*data.ConvitesAtivos)/data.ConvitesTotal;
          let totalUso = (100*data.Utilizando)/data.ConvitesTotal;
          this.dataGraph = [
            {
              "title": "Receberam o convite",
              "value": data.ConvitesTotal,
              "percentual": "",
              "color": "#DA0011"
            }, {
              "title": "Cadastrados",
              "value": data.ConvitesAtivos,
              "percentual": "("+totalAtivo +"%)",
              "color": "#1741A2"
            }, {
              "title": "Utilizaram",
              "value": data.Utilizando,
              "percentual": "("+totalUso +"%)",
              "color": "#4E4E54"
            }
          ];
          this.createGraphFuncionarios();
        },
        createGraphFuncionarios(){
          window.AmCharts.makeChart("graph_funcionarios", {
            "type": "funnel",
            "theme": "light",
            "legend": {
              "position": "bottom",
              "useGraphSettings": false,
              "markerType": "circle",
              "autoMargins": false,
              "marginLeft": 0,
              "marginRight": 0,
              "markerSize": 7,
              "fontSize": 9,
              "valueAlign": "left",
              "labelWidth": 80,
              "valueWidth": 0,
              "align": "center",
              "equalWidths": false,
              "colorField": "color"
            },
            "dataProvider": this.dataGraph,
            "titleField": "title",
            "marginRight": 50,
            "marginLeft": 50,
            "labelText": "[[value]] [[percentual]]",
            "color": "#fff",
            "funnelAlpha": 0.9,
            "valueField": "value",
            "colorField": "color",
            "startX": 0,
            "neckWidth": "40%",
            "startAlpha": 0,
            "outlineThickness": 1,
            "neckHeight": "30%",
            "balloonText": "[[title]]:<b>[[value]]</b>",
            "export": {
              "enabled": true
            }
          });
        }
      }
    )
  }
</script>