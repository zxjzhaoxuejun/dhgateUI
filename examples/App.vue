<template>
  <div id="app">
    <!-- <zxj-button>默认</zxj-button>
    <zxj-card></zxj-card> -->
    <br>
    <!-- <card-stack :card-list="cardList" /> -->
    <div style="width:220px;height:300px;">
      <TestCard />
    </div>
  </div>
</template>

<script>
// import {ZxjButton,ZxjCard} from 'vue-zxj-ui/components/lib'

export default {
  // components:{
  //   ZxjButton,ZxjCard
  // },
  name: 'App',
  data() {
    return {
      cardList: [
        {
          html: `<div>标题1</div><img src="${require('./../public/test1.jpg')}" alt="01">`
        },
        {
          html: `<div>标题2</div><img src="${require('./../public/2.png')}" alt="02">`
        },
        {
          html: `<div>标题3</div><img src="${require('./../public/3.png')}" alt="03">`
        },
        {
          html: `<div>标题1</div><img src="${require('./../public/test1.jpg')}" alt="01">`
        },
        {
          html: `<div>标题2</div><img src="${require('./../public/2.png')}" alt="02">`
        },
        {
          html: `<div>标题3</div><img src="${require('./../public/3.png')}" alt="03">`
        }
      ]
    }
  }
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
