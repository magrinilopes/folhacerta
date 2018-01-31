<template>
  <div class="panel-graph">
    <div class="dash-graph">
      <span class="title-graph">QUANTIDADE DE LICENÇAS</span>
      <span>(%)</span>
      <div class="graph" id="graph_qtdeLicencaPercentual"></div>
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
          this['getDataGraph']('grafico-licenca-medica-percentual').then(ret => {
            if(ret.ok){
              me.treatDataGraph(ret.data.Data);
            }
          })
        },
        treatDataGraph(data){
          let dataTemp = [];
          let graphs = [];
          data.forEach((item, idx) => {
            graphs.push({
              "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
              "fillAlphas": 1,
              "labelText": "[[percents]]% [[diff_tipo_"+idx+"]]",
              "lineAlpha": 0.3,
              "title": item.Tipo,
              "type": "column",
              "fillColors": this.colors[idx],
              "legendColor": this.colors[idx],
              "markerType": "circle",
              "color": "#ffffff",
              "valueField": 'tipo_'+idx
            });
            item.Valores.forEach((val, index) => {
              let id = -1;
              dataTemp.forEach((it, i) => {
                if(it.month == val.Mes){
                  id = i;
                }
              });
              if(id > -1){
                dataTemp[id]['tipo_'+idx] = val.Percentual;
              }
              else{
                let obj = {};
                obj['tipo_'+idx] = val.Percentual;
                obj['diff_tipo_'+idx] = '';
                obj.month = val.Mes;
                dataTemp.push(obj);
              }
            })
          });
          dataTemp.forEach((item, idx) => {
            if(idx > 0){
              item['diff_tipo_'+idx] = ''
            }
          });
          this.dataGraph = dataTemp;
          this.amGraphs = graphs;
          this.createGraphQtdeLicencaPercentual();
        },
        createGraphQtdeLicencaPercentual(){
          window.AmCharts.makeChart("graph_qtdeLicencaPercentual", {
            "type": "serial",
            "autoMargins": true,
            "marginTop": 50,
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
            "valueAxes": [{
              "stackType": "100%",
              "axisAlpha": 0.3,
              "gridAlpha": 0,
              "unit": "%"
            }],
            "graphs": this.amGraphs,
            "categoryField": "month",
            "categoryAxis": {
              "gridPosition": "start",
              "axisAlpha": 0,
              "gridAlpha": 0,
              "position": "left"
            }
          });
        }
      }
    )
  }
</script>