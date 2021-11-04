<template>
<div class="zxj-button" :class="[`zxj-button-${size}`,`zxj-button-${type}`,{'is-round':round},{'is-plain':plain}]">
    <slot></slot>
</div>
</template>

<script>
export default {
    name:'dh-button',
    props:{
        size:{
            type:String,//medium / small / mini
            default:''
        },
        type:{
            type:String,//primary / success / warning / danger / info / text
            default:''
        },
        plain:{
            type:Boolean,//false/true
            default:false
        },
        round:{
            type:Boolean,//false/true
            default:false
        },
    },
    data(){return {}}
}
</script>

<style scoped lang="scss">
@import './button.scss';
</style>