<template>
  <div class="panel-graph">
    <div class="dash-graph">
      <span class="title-graph">QUANTIDADE DE CONSULTAS MÉDICAS</span>
      <span>(TOTAL)</span>
      <div class="graph" id="graph_qtdeConsultasMedicas"></div>
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
        dataGraph: []
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
          this['getDataGraph']('grafico-quantidade-consultas-medicas').then(ret => {
            if(ret.ok){
              me.treatDataGraph(ret.data.Data);
            }
          })
        },
        treatDataGraph(data){
          this.dataGraph = data;
          this.createGraphQtdeConsultasMedicas();
        },
        createGraphQtdeConsultasMedicas(){
          this.chartLine = window.AmCharts.makeChart("graph_qtdeConsultasMedicas", {
            "type": "serial",
            "theme": "light",
            "marginRight": 80,
            "autoMarginOffset": 20,
            "marginTop": 7,
            "valueAxes": [{
              "axisAlpha": 0.2,
              "dashLength": 1,
              "position": "left"
            }],
            "mouseWheelZoomEnabled": true,
            "graphs": [{
              "id": "g1",
              "balloonText": "[[value]]",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "hideBulletsCount": 50,
              "title": "red line",
              "valueField": "Quantidade",
              "useLineColorForBulletBorder": true,
              "balloon":{
                "drop":true
              }
            }],
            "chartScrollbar": {
              "autoGridCount": true,
              "graph": "g1",
              "scrollbarHeight": 40
            },
            "chartCursor": {
              "limitToGraph":"g1"
            },
            "categoryField": "Data",
            "categoryAxis": {
              "parseDates": false,
              "axisColor": "#DADADA",
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "export": {
              "enabled": true
            },
            "dataProvider": this.dataGraph
          });
          this.chartLine.addListener("rendered", this.zoomChart);
          this.zoomChart();
        },
        zoomChart(){
          this.chartLine.zoomToIndexes(this.chartLine.dataProvider.length - 40, this.chartLine.dataProvider.length - 1);
        }
      }
    )
  }
</script>