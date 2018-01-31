<template>
  <div class="component-timeline">
    <span class="icon" style="margin-top: 0;">
      <span class="glyphicon glyphicon-file" style="color: #999999"></span>
    </span>
    <div class="description">
      <span class="timeline-date">{{ formatDate(dataIcon) }}</span>
      <div>
        <div class="timeline-title">{{ title }}</div>
        <div><div v-html="getLines(link)"></div></div>
        <div :style="{color: getColor(data)}">{{ data }}</div>
        <div v-show="data.length <= 30">
          <div class="btn btn-default" :title="tooltip" @click="naoRetorno" style="font-size: .8em">NÃO VOU RETORNAR NESTA DATA</div>
        </div>
      </div>
    </div>
    <div class="modal fade" :class="classe">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Confirmação</h4>
          </div>
          <div class="modal-body">
            <div style="color: red">Ao confirmar, o processo de licença médica será encerrado.</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">CANCELAR</button>
            <button type="button" class="btn btn-primary" @click="confirmarNaoRetorno">CONFIRMAR</button>
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
      relId:{
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
        },
        classe: 'confirmNaoRetorno_'
      }
    },
    created(){
      this.classe += this.relId;
    },
    methods: Object.assign({},
      mapActions(['postRetorno']),
      {
        getLines(text){
          let arrLines = text.split('\n');
          console.log(arrLines);
          let finalText = '';
          arrLines.forEach((item, idx) => {
            if(idx === 0){
              finalText += `<div style="color: red">${item}</div>`;
            }
            else{
              finalText += `<div>${item}</div>`;
            }
          });
          return finalText;
        },
        getColor(text){
          return (text.length > 30) ? 'red' : ''
        },
        formatDate(data){
          let fData = new Date(data);
          let date = fData.getDate() < 10 ? `0${fData.getDate()}` : fData.getDate();
          let hour = fData.getHours() < 10 ? `0${fData.getHours()}` : fData.getHours();
          let mins = fData.getMinutes() < 10 ? `0${fData.getMinutes()}` : fData.getMinutes();
          return `${date} ${this.meses[fData.getMonth()]}, ${hour}:${mins}`;
        },
        naoRetorno(){
          $(`.${this.classe}`).modal('show');
        },
        confirmarNaoRetorno(){
          let me = this;
          this['postRetorno'](this.relId).then(() => {
            me.$parent.loadTimeline();
            $(`.${this.classe}`).modal('hide');
          });
        }
      }
    )
  }
</script>