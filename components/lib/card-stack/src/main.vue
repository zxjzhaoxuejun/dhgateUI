<template>
    <ul class="card-stack">
        <li class="card-stack-item" 
        v-for="(item,index) in cardList" 
        :key="index"
        v-show="!item.isShow" 
        :style="[transformIndex(index),transform(index)]"
        @touchmove.stop.capture.prevent="touchmove"
        @touchstart.stop.capture.prevent="touchstart"
        @touchend.stop.capture.prevent="touchend($event,index)"
        @touchcancel.stop.capture.prevent="touchend($event,index)"
        @mousedown.stop.capture.prevent="touchstart"
        @mouseup.stop.capture.prevent="touchend($event,index)"
        @mousemove.stop.capture.prevent="touchmove"
        @mouseout.stop.capture.prevent="touchend($event,index)"
        @webkit-transition-end="onTransitionEnd(index)"
        @transitionend="onTransitionEnd(index)">
            <div v-html="item.html"></div>
        </li>
    </ul>
</template>

<script>
import detectPrefixes from '../utils/index.js'
export default {
    props:{
        cardList:{
            type:Array,
            default:()=>[]
        },
        stackinit:{
            type:Object,
            default:()=>{
                return {
                    visible:3
                }
            }
        }
    },
    name:'card-stack',
    data () {
    return {
      basicdata: {
        start: {},
        end: {}
      },
      temporaryData: {
        prefixes: detectPrefixes(),
        offsetY: '',
        poswidth: 0,
        posheight: 0,
        lastPosWidth: '',
        lastPosHeight: '',
        lastZindex: '',
        rotate: 0,
        lastRotate: 0,
        visible: this.stackinit.visible || 3,
        tracking: false,
        animation: false,
        currentPage: this.stackinit.currentPage || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      }
    }
  },
  computed: {
    // 划出面积比例
    offsetRatio () {
      let width = this.$parent.$el.offsetWidth
      let height = this.$parent.$el.offsetHeight
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let offsetHeight = height - Math.abs(this.temporaryData.posheight)
      let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
      return ratio > 1 ? 1 : ratio
    },
    // 划出宽度比例
    offsetWidthRatio () {
      let width = this.$parent.$el.offsetWidth
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let ratio = 1 - offsetWidth / width || 0
      return ratio
    }
  },
  mounted () {
    // 绑定事件
    this.$on('next', () => {
      this.next()
    })
    this.$on('prev', () => {
      this.prev()
    })
    document.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    touchstart (e) {
      if (this.temporaryData.tracking) {
        return
      }
      // 是否为touch
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
          // offsetY在touch事件中没有，只能自己计算
          this.temporaryData.offsetY = e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop
        }
      // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
        this.temporaryData.offsetY = e.offsetY
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
    },
    touchmove (e) {
      // 记录滑动位置
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === 'touchmove') {
          e.preventDefault()
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          e.preventDefault()
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // 计算滑动值
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
        let rotateDirection = this.rotateDirection()
        let angleRatio = this.angleRatio()
        this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
      }
    },
    touchend(e,index) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.4
      if (this.offsetRatio >= 0.4) {
        // 计算划出后最终位置
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
        this.temporaryData.opacity = 0
        this.temporaryData.swipe = true
        this.nextTick(index)
      // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.swipe = false
        this.temporaryData.rotate = 0
      }
    },
    nextTick (index) {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth
      this.temporaryData.lastPosHeight = this.temporaryData.posheight
      this.temporaryData.lastRotate = this.temporaryData.rotate
      this.temporaryData.lastZindex = 20
      // 循环currentPage
      console.log('滑动成功')
      this.temporaryData.currentPage = this.temporaryData.currentPage === this.cardList.length - 1 ? 0 : this.temporaryData.currentPage + 1
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.cardList[index]['isShow']=true
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.opacity = 1
        this.temporaryData.rotate = 0
      })
    },
    onTransitionEnd (index) {
      let lastPage = this.temporaryData.currentPage === 0 ? this.cardList.length - 1 : this.temporaryData.currentPage - 1
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true
        this.temporaryData.lastPosWidth = 0
        this.temporaryData.lastPosHeight = 0
        this.temporaryData.lastOpacity = 0
        this.temporaryData.lastRotate = 0
        this.temporaryData.swipe = false
        this.temporaryData.lastZindex = -1
      }
    },
    prev () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = -width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '-3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    next () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    rotateDirection () {
      if (this.temporaryData.poswidth <= 0) {
        return -1
      } else {
        return 1
      }
    },
    angleRatio () {
      let height = this.$parent.$el.offsetHeight
      let offsetY = this.temporaryData.offsetY
      let ratio = -1 * (2 * offsetY / height - 1)
      return ratio || 0
    },
    inStack (index, currentPage) {
      let stack = []
      let visible = this.temporaryData.visible
      let length = this.cardList.length
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i)
        } else {
          stack.push(currentPage + i - length)
        }
      }
      return stack.indexOf(index) >= 0
    },
    // 非首页样式切换
    transform (index) {
        let style = {}
        this.$nextTick(() => {
            let currentPage = this.temporaryData.currentPage
            let length = this.cardList.length
            let lastPage = currentPage === 0 ? this.cardList.length - 1 : currentPage - 1
            let visible = this.temporaryData.visible
            if (index === this.temporaryData.currentPage) {
                return
            }
            if (this.inStack(index, currentPage)) {
                let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
                style['opacity'] = '1'
                style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
                style['zIndex'] = visible - perIndex
                if (!this.temporaryData.tracking) {
                style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
                style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
                }
            } else if (index === lastPage) {
                style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
                style['opacity'] = this.temporaryData.lastOpacity
                style['zIndex'] = this.temporaryData.lastZindex
                style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
                style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
            } else {
                style['zIndex'] = '-1'
                style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
            }
        })
        return style
    },
    // 首页样式切换
    transformIndex (index) {
        let style = {}
        const colorMap=['#ff3300','#409EFF','#67C23A','#F56C6C','#E6A23C']
      if (index === this.temporaryData.currentPage) {
        style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
        style['opacity'] = this.temporaryData.opacity
        style['zIndex'] = 10
        style['background'] ="#ff6600"
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
        }
      }else{
          const scaleVal=1-index*0.03
          const topSize=index*12
          style['top'] =`-${topSize}px`
          style['transform'] =`scale(${scaleVal})`
          style['zIndex'] = -index
      }
      style['background'] =colorMap[index]
      return style
    }
  }

}
</script>

<style scoped>

</style>