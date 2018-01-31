<template>
  <div class="component-timeline">
    <span class="icon" style="margin-top: 0;">
      <span class="glyphicon glyphicon-file" style="color: #999999"></span>
    </span>
    <div class="description">
      <span class="timeline-date">{{ formatDate(dataIcon) }}</span>
      <div>
        <div class="timeline-title">{{ title }}</div>
        <div v-if="link">
          <div>{{ getCompleteDate(link) }}</div>
          <div>{{ data }}</div>
        </div>
        <div v-if="!link">
          <div class="btn btn-default" :title="tooltip" @click="agendar">AGENDAR</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dataIcon:{
        type: String,
        required: true
      },
      title:{
        type: String,
        required: true
      },
      link:{
        type: String
      },
      tooltip:{
        type: String
      }
    },
    data(){
      return{
        diasSemana: [
          'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'
        ],
        meses: {
          0: 'JAN',
          1: 'FEV',
          2: 'MAR',
          3: 'ABR',
          4: 'MAI',
          5: 'JUN',
          6: 'JUL',
          7: 'AGO',
          8: 'SET',
          9: 'OUT',
          10: 'NOV',
          11: 'DEZ',
        }
      }
    },
    methods:{
      getCompleteDate(data){
        let fData = new Date(data);
        let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
        let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
        let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
        let sem = this.diasSemana[fData.getDay()];
        return `${date} ${this.meses[fData.getMonth()]}, ${sem} - às ${hour}:${mins}`;
      },
      formatDate(data){
        let fData = new Date(data);
        let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
        let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
        let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
        return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
      },
      agendar(){
        console.log("Não vou retornar nesta data.");
      }
    }
  }
</script>