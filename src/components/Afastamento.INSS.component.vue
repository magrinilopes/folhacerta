<template>
  <div class="component-timeline">
    <span class="icon">
      <div class="ball"></div>
    </span>
    <div class="description">
      <span class="timeline-date">{{ formatDate(dataIcon) }}</span>
      <div>
        <div class="timeline-title">{{ title }}</div>
        <div>
          <span>{{ data }}</span>
        </div>
        <div class="btn btn-default" @click="verCID">VER CID'S</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      userToken:{
        type: String,
        required: true
      },
      afastamentoId:{
        type: Number,
        required: true
      },
      dataIcon:{
        type: String,
        required: true
      },
      title:{
        type: String,
        required: true
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
      },
      verCID(){
        this.$router.push({ name: 'timeline_afastamento', params: { userToken: this.userToken, afastamentoId: this.afastamentoId }});
      }
    }
  }
</script>