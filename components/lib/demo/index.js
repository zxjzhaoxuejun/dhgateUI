import TestDemo from './src/main.vue'
TestDemo.install=function(Vue){
    Vue.component(TestDemo.name,TestDemo)
}

export default TestDemo