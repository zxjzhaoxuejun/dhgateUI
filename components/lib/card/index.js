import DhCard from './src/main.vue'

DhCard.install = function(Vue) {
  Vue.component(DhCard.name, DhCard)
}

export default DhCard
