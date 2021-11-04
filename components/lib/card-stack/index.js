import CardStack from './src/main.vue'

CardStack.install=function(Vue){
    Vue.component(CardStack.name,CardStack)
}

export default CardStack