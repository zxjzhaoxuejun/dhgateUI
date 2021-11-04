<template>
  <div class="card">
    <div
      v-for="(item,index) in pages"
      v-show="!item.isShow"
      :key="index"
      class="card-item"
      :style="[transform(index)]"
      @touchmove.stop.capture.prevent="touchmove"
      @touchstart.stop.capture.prevent="touchstart"
      @mousedown.stop.capture.prevent="touchstart"
      @mousemove.stop.capture.prevent="touchmove"
      @mouseup.stop.capture.prevent="touchend($event, index)"
      @mouseout.stop.capture.prevent="touchend($event, index)"
      @webkit-transition-end="onTransitionEnd(index)"
      @transitionend="onTransitionEnd(index)"
    >
      <div class="card-info">
        <img :src="item.imgUrl" alt="01">
        <h3>{{ item.title }}</h3>
        <div class="card-text">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import detectPrefixes from '../../card-stack/utils/index.js'
export default {
  name: 'TestCard',
  data() {
    return {
      pages: [
        {
          imgUrl: require('./../../../../public/test1.jpg'),
          title: '测试标题',
          desc: '测试需注意参考下面的供应商商品的税费规则，测试不同场景'
        },
        {
          imgUrl: require('./../../../../public/2.png'),
          title: '测试标题',
          desc: '测试需注意参考下面的供应商商品的税费规则，测试不同场景'
        },
        {
          imgUrl: require('./../../../../public/3.png'),
          title: '测试标题',
          desc: '测试需注意参考下面的供应商商品的税费规则，测试不同场景'
        },
        {
          imgUrl: require('./../../../../public/test1.jpg'),
          title: '测试标题',
          desc: '测试需注意参考下面的供应商商品的税费规则，测试不同场景'
        },
        {
          imgUrl: require('./../../../../public/2.png'),
          title: '测试标题',
          desc: '测试需注意参考下面的供应商商品的税费规则，测试不同场景'
        },
        {
          imgUrl: require('./../../../../public/3.png'),
          title: '测试标题',
          desc: '测试需注意参考下面的供应商商品的税费规则，测试不同场景'
        }
      ],
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
        visible: 3,
        tracking: false,
        animation: false,
        currentPage: 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      },
      basicdata: {
        start: {},
        end: {}
      }
    }
  },
  // props: {
  //   pages: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  computed: {
    // 划出面积比例
    offsetRatio() {
      const width = this.$el.offsetWidth
      const height = this.$el.offsetHeight
      const offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      const offsetHeight = height - Math.abs(this.temporaryData.posheight)
      const ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
      return ratio > 1 ? 1 : ratio
    },
    // 划出宽度比例
    offsetWidthRatio() {
      const width = this.$el.offsetWidth
      const offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      const ratio = 1 - offsetWidth / width || 0
      return ratio
    }
  },
  mounted() {
    document.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    touchmove(e) {
      // 移动事件
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
        const rotateDirection = this.rotateDirection()
        const angleRatio = this.angleRatio()
        this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
      }
    },
    rotateDirection() {
      if (this.temporaryData.poswidth <= 0) {
        return -1
      } else {
        return 1
      }
    },
    angleRatio() {
      const height = this.$el.offsetHeight
      const offsetY = this.temporaryData.offsetY
      const ratio = -1 * (2 * offsetY / height - 1)
      return ratio || 0
    },
    inStack(index, currentPage) {
      const stack = []
      const visible = this.temporaryData.visible
      const length = this.pages.length
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i)
        } else {
          stack.push(currentPage + i - length)
        }
      }
      return stack.indexOf(index) >= 0
    },
    touchstart(e) {
      // 开始滑动
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
    touchend(e, index) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.4
      if (this.offsetRatio >= 0.4) {
        // 计算划出后最终位置
        const ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
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
    nextTick(index) {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth
      this.temporaryData.lastPosHeight = this.temporaryData.posheight
      this.temporaryData.lastRotate = this.temporaryData.rotate
      this.temporaryData.lastZindex = 20
      // 循环currentPage
      console.log('滑动成功')
      this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.pages[index]['isShow'] = true
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.opacity = 1
        this.temporaryData.rotate = 0
      })
    },
    // 卡片样式
    transform(index) {
      const style = {}
      const bgMap = ['#ff3300', '#409EFF', '#67C23A', '#F56C6C', '#E6A23C']
      const scaleVal = -(1 - index * 0.03) * 60 * index
      const topSize = -(index * 30)
      style['transform'] = `translate3D(0,${topSize}px,${scaleVal}px)`
      style['zIndex'] = this.pages.length - index
      style['background'] = bgMap[index]
      if (index === this.temporaryData.currentPage) {
        style['opacity'] = this.temporaryData.opacity
        style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
        }
      }
      return style
    },
    onTransitionEnd(index) {
      const lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
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
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  position: relative;
  width: 100%;
  height:100%;
  padding: 0;
  margin: 0 auto;
  cursor: pointer;
  perspective: 1000px;
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  -webkit-perspective-origin: 150% 150%;

  &-item{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 4px;
    box-shadow:0 0 2px 5px rgba(95,101,105,0.15);
    padding-bottom: 15px;
    overflow: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
  }

  &-info{
    img{
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    h3{
      padding: 10px;
      font-size: 16px;
      margin: 0;
      color: #282828;
    }

    .card-text{
      font-size: 14px;
      color: #484848;
      padding:0 10px;
    }
  }
}
</style>
