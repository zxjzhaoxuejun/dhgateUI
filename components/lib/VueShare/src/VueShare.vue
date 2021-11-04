
<script>
import ShareLinks from './share-links'
const $window = typeof window !== 'undefined' ? window : null
export default {
  name: 'VueShare',

  props: {
    /**
     * 分享平台名称
     */
    shareMethod: {
      type: String,
      required: true
    },

    /**
     * 分享链接
     */
    url: {
      type: String,
      required: true
    },

    /**
     *分享标题
     */
    title: {
      type: String,
      required: true
    },

    /**
     *分享描述 Description
     */
    description: {
      type: String,
      default: ''
    },

    /**
     * Facebook报价（仅限Facebook）quote
     */
    quote: {
      type: String,
      default: ''
    },

    /**
     * 逗号分隔的标签列表（Twitter和Facebook）Hashtags
     */
    hashtags: {
      type: String,
      default: ''
    },

    /**
     * Twitter用户（仅限Twitter）
     * @var string
     */
    twitterUser: {
      type: String,
      default: ''
    },

    /**
     * 引导至媒体（Pinterest，VK，微博和Wordpress）
     */
    media: {
      type: String,
      default: ''
    },

    /**
     * HTML tag used by the share component.
     */
    tag: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      popup: {
        width: 626,
        height: 436,
        top: 0,
        left: 0,
        window: undefined,
        interval: null
      }
    }
  },
  computed: {
    /**
     * 获取分享平台名称
     */
    key() {
      return this.shareMethod.toLowerCase()
    },
    /**
     * 创建分享链接
     */
    shareLink() {
      let link = this.rawLink

      /**
       * Twitter分享不应该包含空参数
       */
      if (this.key === 'twitter') {
        if (!this.hashtags.length) link = link.replace('&hashtags=@h', '')
        if (!this.twitterUser.length) link = link.replace('@tu', '')
      }

      return link
        .replace(/@tu/g, '&via=' + encodeURIComponent(this.twitterUser))
        .replace(/@u/g, encodeURIComponent(this.url))
        .replace(/@t/g, encodeURIComponent(this.title))
        .replace(/@d/g, encodeURIComponent(this.description))
        .replace(/@q/g, encodeURIComponent(this.quote))
        .replace(/@h/g, this.encodedHashtags)
        .replace(/@m/g, encodeURIComponent(this.media))
    },
    /**
     * 网络共享原始共享链接
     */
    rawLink() {
      const ua = navigator.userAgent.toLowerCase()

      /**
       *在IOS上，短信共享链接需要特殊格式
       */
      if (this.key === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        return ShareLinks[this.key].replace(':?', ':&')
      }

      return ShareLinks[this.key]
    },
    /**
     * 当前社交网络的编码标签
     */
    encodedHashtags() {
      if (this.key === 'facebook' && this.hashtags.length) {
        return '%23' + this.hashtags.split(',')[0]
      }

      return this.hashtags
    }
  },
  methods: {
    /**
     * 多屏幕上的弹出窗口的中心
     */
    resizePopup() {
      const width = $window.innerWidth || (document.documentElement.clientWidth || $window.screenX)
      const height = $window.innerHeight || (document.documentElement.clientHeight || $window.screenY)
      const systemZoom = width / $window.screen.availWidth

      this.popup.left = (width - this.popup.width) / 2 / systemZoom + ($window.screenLeft !== undefined ? $window.screenLeft : $window.screenX)
      this.popup.top = (height - this.popup.height) / 2 / systemZoom + ($window.screenTop !== undefined ? $window.screenTop : $window.screenY)
    },
    /**
     * 在指定网络中共享URL。
     */
    share() {
      this.resizePopup()

      // 如果弹出窗口已经存在，则关闭它并触发一个更改事件
      if (this.popup.window && this.popup.interval) {
        clearInterval(this.popup.interval)

        // Force close (for Facebook)
        this.popup.window.close()

        this.emit('change')
      }

      this.popup.window = $window.open(
        this.shareLink,
        'sharer',
        ',height=' + this.popup.height +
        ',width=' + this.popup.width +
        ',left=' + this.popup.left +
        ',top=' + this.popup.top +
        ',screenX=' + this.popup.left +
        ',screenY=' + this.popup.top
      )

      this.popup.window.focus()
      // 创建一个间隔来检测弹出关闭事件
      this.popup.interval = setInterval(() => {
        if (!this.popup.window || this.popup.window.closed) {
          clearInterval(this.popup.interval)

          this.popup.window = null
          this.emit('close')
        }
      }, 500)
      this.emit('open')
    },

    /**
     * 触摸shareMethod并发出单击事件。
     */
    touch() {
      window.open(this.shareLink, '_blank')
      this.emit('open')
    },

    emit(name) {
      this.$root.$emit('share_network_' + name, this.key, this.url)
      this.$emit(name, this.key, this.url)
    }
  },
  render: function(createElement) {
    if (!ShareLinks[this.key]) {
      throw new Error('shareMethod ' + this.key + ' does not exist')
    }

    return createElement(this.tag, {
      class: 'share-method-' + this.key,
      on: {
        click: () => this[this.rawLink.substring(0, 4) === 'http' ? 'share' : 'touch']()
      }
    }, this.$slots.default)
  }

}
</script>
