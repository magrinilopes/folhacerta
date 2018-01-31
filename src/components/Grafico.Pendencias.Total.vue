<template>
  <div class="panel-graph">
    <div class="dash-graph">
      <span class="title-graph">PENDÊNCIAS</span>
      <span>(TOTAL)</span>
      <div class="graph" id="graph_pendenciasTotal"></div>
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
          this['getDataGraph']('grafico-pendencias').then(ret => {
            if(ret.ok){
              me.treatDataGraph(ret.data.Data);
            }
          })
        },
        treatDataGraph(data){
          this.dataGraph = data;
          this.createGraphPendenciasTotal();
        },
        createGraphPendenciasTotal(){
          this.chart = window.AmCharts.makeChart("graph_pendenciasTotal", {
            "type": "serial",
            "theme": "none",
            "legend": {
              "position": "bottom",
              "useGraphSettings": true,
              "autoMargins": false,
              "marginLeft": 0,
              "marginRight": 0,
              "markerSize": 7,
              "fontSize": 9,
              "valueAlign": "left",
              "labelWidth": 80,
              "valueWidth": 0,
              "align": "center",
              "equalWidths": false
            },
            "dataProvider": this.dataGraph,
            "synchronizeGrid":true,
            "valueAxes": [{
              "id":"v1",
              "axisColor": "#DA0011",
              "axisThickness": 2,
              "axisAlpha": 1,
              "position": "left"
            }, {
              "id":"v2",
              "axisColor": "#1741A2",
              "axisThickness": 2,
              "axisAlpha": 1,
              "position": "right"
            }, {
              "id":"v3",
              "axisColor": "#4E4E54",
              "axisThickness": 2,
              "gridAlpha": 0,
              "offset": 50,
              "axisAlpha": 1,
              "position": "left"
            }, {
              "id":"v4",
              "axisColor": "#00C233",
              "axisThickness": 2,
              "gridAlpha": 0,
              "offset": 50,
              "axisAlpha": 1,
              "position": "right"
            }],
            "graphs": [{
              "valueAxis": "v1",
              "lineColor": "#DA0011",
              "bullet": "round",
              "bulletBorderThickness": 1,
              "hideBulletsCount": 30,
              "title": "Funcionário",
              "valueField": "Funcionario",
              "fillAlphas": 0
            }, {
              "valueAxis": "v2",
              "lineColor": "#1741A2",
              "bullet": "square",
              "bulletBorderThickness": 1,
              "hideBulletsCount": 30,
              "title": "Gestor",
              "valueField": "Gestor",
              "fillAlphas": 0
            }, {
              "valueAxis": "v3",
              "lineColor": "#4E4E54",
              "bullet": "triangleUp",
              "bulletBorderThickness": 1,
              "hideBulletsCount": 30,
              "title": "RH",
              "valueField": "Rh",
              "fillAlphas": 0
            }, {
              "valueAxis": "v4",
              "lineColor": "#00C233",
              "bullet": "triangleDown",
              "bulletBorderThickness": 1,
              "hideBulletsCount": 30,
              "title": "Área Médica",
              "valueField": "AreaMedica",
              "fillAlphas": 0
            }],
            "chartScrollbar": {},
            "chartCursor": {
              "cursorPosition": "mouse"
            },
            "categoryField": "Mes",
            "categoryAxis": {
              "parseDates": false,
              "axisColor": "#DADADA",
              "minorGridEnabled": true
            }
          });

          this.chart.addListener("dataUpdated", this.zoomChart);
          this.zoomChart();
        },
        zoomChart(){
          this.chart.zoomToIndexes(this.chart.dataProvider.length - 20, this.chart.dataProvider.length - 1);
        }
      }
    )
  }
</script>