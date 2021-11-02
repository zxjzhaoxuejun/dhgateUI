import Vue from 'vue'
import App from './App.vue'
// import './../components/style/demo.scss'
// import './../components/style/card.scss'
import './../components/style/index.scss'
import 'vue-zxj-ui/dist/css/index.css'
// import TestDemo from '../components/lib/demo/index'
// import {TestDemo} from '../components/lib/index'
// import WebUi from 'vue-zxj-ui'
// Vue.component('TestDemo', TestDemo)
// Vue.component('DhCard', DhCard)
// Vue.use(TestDemo)
// Vue.use(DhCard)
// Vue.use(WebUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
