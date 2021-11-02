<template>
<div class="card-warp" :style="width?{width:width+'px'}:{}">
    <div class="card-warp-img"  :style="imgHeight?{height:imgHeight+'px'}:{}">
        <img :src="imgSrc" alt="img" />
    </div>
    <div class="card-warp-summary" v-if="summary">{{summary}}</div>
    <div v-else class="card-warp-summary">
        <slot></slot>
    </div>
    <slot name="footer"></slot>
</div>
</template>

<script>
export default {
    name:'DhCard',
    props:{
        width:{//卡片宽度
            type:Number,
            default:0
        },
        imgSrc:{//卡片图片资源
            type:String,
            default:''
        },
        imgHeight:{//卡片图片高度
            type:Number,
            default:0
        },
        summary:{//卡片的概要
            type:String,
            default:''
        }
    },
    data(){return {
        
    }}
}
</script>

<style scoped>

</style>