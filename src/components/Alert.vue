<template>
  <div class="alertBox" :class="{show: getAlertShow, hide: !getAlertShow}" @click="closeAlert" :style="getTop">
    <div class="alert" :class="{'alert-danger': !getAlertSuccess, 'alert-success': getAlertSuccess}">{{ getAlertText }}</div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props:{
      top: {
        type: Number,
        required: true
      }
    },
    watch:{
      getAlertShow: 'timerCloseAlert'
    },
    methods: Object.assign({},
      mapActions(['changeAlert']),
      {
        timerCloseAlert(){
          setTimeout(() => {
            this['changeAlert']({show: false, success: false, text: ''})
          }, this.getAlertTime);
        },
        closeAlert(){
          this['changeAlert']({show: false, success: false, text: ''})
        }
      }
    ),
    computed: Object.assign({},
      mapGetters([
        'getAlertShow', 'getAlertText', 'getAlertSuccess', 'getAlertTime'
      ]),
      {
        getTop(){
          return `top: ${this.top}px !important;`;
        }
      }
    )
  }
</script>