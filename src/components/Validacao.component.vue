<template>
  <div class="component-timeline">
    <span class="icon">
      <div class="ball"></div>
    </span>
    <div class="description">
      <span class="timeline-date">{{ formatDate(dataIcon) }}</span>
      <div>
        <div class="timeline-title">{{ title }}</div>
        <div v-if="link && data.toUpperCase() != 'AGUARDANDO'">
          <span style="display: block;">{{ link }}</span>
          <span :style="style">{{ data }}</span>
        </div>
        <div v-if="!link || data.toUpperCase() == 'AGUARDANDO'">
          <div class="btn btn-default" :title="tooltip" @click="showValidar">VALIDAR</div>
        </div>
      </div>
    </div>
    <div class="modal fade validar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Validação</h4>
          </div>
          <div class="modal-body">
            <p>{{ tooltip }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">VALIDAR DEPOIS</button>
            <button type="button" class="btn btn-danger" @click="validar(false)">NÃO VALIDAR</button>
            <button type="button" class="btn btn-primary" @click="validar(true)">VALIDAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: {
      dataIcon:{
        type: String,
        required: true
      },
      afastamentoId:{
        type: Number,
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
    computed:{
      style(){
        return (this.data.toUpperCase() == 'VALIDADO') ? {color: "green"} : {color: "red"};
      }
    },
    methods: Object.assign({},
      mapActions(['postValidar']),
      {
        formatDate(data){
          let fData = new Date(data);
          let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
          let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
          let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
          return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
        },
        showValidar(){
          $('.validar').modal('show');
        },
        validar(val){
          let obj = {
            AfastamentoId: this.afastamentoId,
            Valido: val
          };
          let me = this;
          this['postValidar'](obj).then(ret => {
            if(ret.ok){
              me.$parent.loadTimeline();
              $('.validar').modal('hide');
            }
          });
        }
      }
    )
  }
</script>