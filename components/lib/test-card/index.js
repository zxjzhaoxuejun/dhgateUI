import TestCard from './src/main.vue'
TestCard.install = function(Vue) {
  Vue.component(TestCard.name, TestCard)
}

export default TestCard
