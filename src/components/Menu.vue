<template>
  <div class="panel panel-default" style="padding-bottom: 40px">
    <div class="list-group">
      <router-link class="list-group-item" v-for="menu in items" :key="menu.route" :event="menu.disabled ? '' : 'click'" :class="{disabled: menu.disabled}" v-bind:to="menu.route">{{ menu.text }}</router-link>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      items: {
        required: true,
        type: Array
      }
    }
  }
</script>