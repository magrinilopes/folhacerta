<template>
  <div class="component-timeline">
    <span class="icon">
      <div class="carrinhoBebe"></div>
    </span>
    <div class="description">
      <span class="timeline-date">{{ formatDate(dataIcon) }}</span>
      <div>
        <div class="timeline-title">{{ title }}</div>
        <div>{{ data }}</div>
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
      data:{
        type: String
      }
    },
    data(){
      return{
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
      formatDate(data){
        let fData = new Date(data);
        let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
        let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
        let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
        return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
      }
    }
  }
</script>