<template>
  <div class="panel-graph">
    <div class="dash-graph">
      <span class="title-graph">QUANTIDADE DE INDEFERIMENTO</span>
      <span>(TOTAL)</span>
      <div class="graph" id="graph_qtdeIndeferimento"></div>
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
          this['getDataGraph']('grafico-indeferimentos').then(ret => {
            if(ret.ok){
              me.treatDataGraph(ret.data.Data);
            }
          })
        },
        treatDataGraph(data){
          this.dataGraph = data;
          this.createGraphQtdeIndeferimento();
        },
        createGraphQtdeIndeferimento(){
          window.AmCharts.makeChart("graph_qtdeIndeferimento", {
            "type": "serial",
            "theme": "light",
            "dataProvider": this.dataGraph,
            "valueAxes": [{
              "axisAlpha": 0,
              "position": "left"
            }],
            "startDuration": 1,
            "graphs": [{
              "balloonText": "<b>[[category]]: [[value]]</b>",
              "fillAlphas": 1,
              "lineAlpha": 0.2,
              "fillColors": "#1741A2",
              "color": "#fff",
              "labelText": "[[value]]",
              "labelPosition": "middle",
              "type": "column",
              "valueField": "Total"
            }],
            "categoryField": "Mes",
            "categoryAxis": {
              "gridPosition": "start"
            }
          });
        }
      }
    )
  }
</script>