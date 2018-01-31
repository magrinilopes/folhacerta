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
          <div class="btn btn-default" :title="tooltip" @click="abrirModal">AGENDAR</div>
        </div>
      </div>
    </div>
    <div class="modal fade" :class="getClassName()">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="fecharModal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">AGENDAMENTO DE PERÍCIA</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 form-group">
                <label>Data</label>
                <input type="date" class="form-control" v-model="data_agenda">
              </div>
              <div class="col-lg-6 form-group">
                <label>Hora</label>
                <input type="time" class="form-control" v-model="hora_agenda">
              </div>
              <div class="col-lg-12">
                <label>Endereço</label>
                <textarea class="form-control" v-model="endereco_agenda" style="resize: none;height: 96px"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="fecharModal">FECHAR</button>
            <button type="button" class="btn btn-primary" @click="agendar"
              :class="{disabled: !endereco_agenda || !data_agenda || !hora_agenda}">AGENDAR</button>
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
      tokenApp:{
        type: String,
        required: true
      },
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
      link:{
        type: String
      },
      data:{
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
        },
        data_agenda: '',
        hora_agenda: '',
        endereco_agenda: ''
      }
    },
    created(){
      this.setInitialDate();
    },
    methods: Object.assign({},
      mapActions(['postAgendamentos']),
      {
        setInitialDate(){
          let data = new Date();
          let diaData = data.getDate() > 9 ? data.getDate() : `0${data.getDate()}`;
          let mesData = data.getMonth()+1 > 9 ? data.getMonth()+1 : `0${data.getMonth()+1}`;
          let horaData = data.getHours() > 9 ? data.getHours() : `0${data.getHours()}`;
          let minData = data.getMinutes() > 9 ? data.getMinutes() : `0${data.getMinutes()}`;
          this.data_agenda = `${data.getFullYear()}-${mesData}-${diaData}`;
          this.hora_agenda = `${horaData}:${minData}`;
        },
        getClassName(){
          return `agenda_pericia_${this.relId}`;
        },
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
        abrirModal(){
          $(`.agenda_pericia_${this.relId}`).modal('show');
        },
        fecharModal(){
          this.setInitialDate();
          this.endereco_agenda = '';
          $(`.agenda_pericia_${this.relId}`).modal('hide');
        },
        agendar(){
          let obj = {
            TokenApp: this.tokenApp,
            Data: `${this.data_agenda}T${this.hora_agenda}:00`,
            Endereco: this.endereco_agenda,
            Tipo: 1
          };
          let me = this;
          this['postAgendamentos'](obj).then(() => {
            me.$parent.loadTimeline();
            me.fecharModal();
          });
        }
      }
    )
  }
</script>