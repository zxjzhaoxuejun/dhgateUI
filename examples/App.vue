<template>
  <div id="app">
    <zxj-button>默认</zxj-button>
    <zxj-card></zxj-card>
    <br>
  </div>
</template>

<script>
import {ZxjButton,ZxjCard} from 'vue-zxj-ui/components/lib'

export default {
  components:{
    ZxjButton,ZxjCard
  },
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
