<template>
  <div>
    <div class="title-page">Dashboard</div>
    <div class="row">
      <div class="col-lg-6" style="padding-right: 0;">
        <grafico-licencaTotal></grafico-licencaTotal>
      </div>
      <div class="col-lg-6" style="padding-left: 0;">
        <grafico-licencaPercentual></grafico-licencaPercentual>
      </div>
      <div class="col-lg-6" style="padding-right: 0;">
        <grafico-qtdeLicencaTotal></grafico-qtdeLicencaTotal>
      </div>
      <div class="col-lg-6" style="padding-left: 0;">
        <grafico-qtdeLicencaPercentual></grafico-qtdeLicencaPercentual>
      </div>
      <div class="col-lg-6" style="padding-right: 0;">
        <grafico-qtdeIndeferimento></grafico-qtdeIndeferimento>
      </div>
      <div class="col-lg-6" style="padding-left: 0;">
        <grafico-funcionarios></grafico-funcionarios>
      </div>
      <div class="col-lg-12">
        <grafico-qtdeConsultasMedicas></grafico-qtdeConsultasMedicas>
      </div>
      <div class="col-lg-6" style="padding-right: 0;">
        <grafico-ausenciaInferiores></grafico-ausenciaInferiores>
      </div>
      <div class="col-lg-6" style="padding-left: 0;">
        <grafico-ausenciaSuperiores></grafico-ausenciaSuperiores>
      </div>
      <div class="col-lg-6" style="padding-right: 0;">
        <grafico-pendenciasTotal></grafico-pendenciasTotal>
      </div>
      <div class="col-lg-6" style="padding-left: 0;">
        <grafico-pendenciasPercentual></grafico-pendenciasPercentual>
      </div>
      <div class="col-lg-6" style="padding-right: 0;">
        <grafico-inssTotal></grafico-inssTotal>
      </div>
      <div class="col-lg-6" style="padding-left: 0;">
        <grafico-inssPercentual></grafico-inssPercentual>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import state from '../state';
  import GraficoLicencasTotal from './Grafico.Licencas.Total.vue';
  import GraficoLicencasPercentual from './Grafico.Licencas.Percentual.vue';
  import GraficoQtdeLicencasTotal from './Grafico.Quantidade.Licencas.Total.vue';
  import GraficoQtdeLicencasPercentual from './Grafico.Quantidade.Licencas.Percentual.vue';
  import GraficoQtdeIndeferimento from './Grafico.Quantidade.Indeferimento.vue';
  import GraficoFuncionarios from './Grafico.Funcionarios.vue';
  import GraficoQtdeConsultasMedicas from './Grafico.Consulta.Medica.vue';
  import GraficoAusenciaInferiores from './Grafico.Ausencias.Inferiores.vue';
  import GraficoAusenciaSuperiores from './Grafico.Ausencias.Superiores.vue';
  import GraficoPendenciasTotal from './Grafico.Pendencias.Total.vue';
  import GraficoPendenciasPercentual from './Grafico.Pendencias.Percentual.vue';
  import GraficoINSSTotal from './Grafico.INSS.Total.vue';
  import GraficoINSSPercentual from './Grafico.INSS.Percentual.vue';

  export default {
    components:{
      'grafico-licencaTotal': GraficoLicencasTotal,
      'grafico-licencaPercentual': GraficoLicencasPercentual,
      'grafico-qtdeLicencaTotal': GraficoQtdeLicencasTotal,
      'grafico-qtdeLicencaPercentual': GraficoQtdeLicencasPercentual,
      'grafico-qtdeIndeferimento': GraficoQtdeIndeferimento,
      'grafico-funcionarios': GraficoFuncionarios,
      'grafico-qtdeConsultasMedicas': GraficoQtdeConsultasMedicas,
      'grafico-ausenciaInferiores': GraficoAusenciaInferiores,
      'grafico-ausenciaSuperiores': GraficoAusenciaSuperiores,
      'grafico-pendenciasTotal': GraficoPendenciasTotal,
      'grafico-pendenciasPercentual': GraficoPendenciasPercentual,
      'grafico-inssTotal': GraficoINSSTotal,
      'grafico-inssPercentual': GraficoINSSPercentual,
    },
    data(){
      return{
        chartLine: {}
      }
    },
    created(){
      if(!this.getToken){
        this.$router.push('/');
      }
    },
    computed: Object.assign({},
      mapGetters(['getToken']),
      {
      }
    ),
    methods: Object.assign({},
      mapActions([]),
      {
      }
    )
  }
</script>