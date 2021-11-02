import TestDemo from './demo/index'
import DhCard from './card/index'

const components=[
    TestDemo,
    DhCard
]

const install = function(Vue) {
    if (install.installed) return
    install.installed = true
    components.map(item => {
      Vue.component(item.name, item)
    })
  }

//引用文件方式时，会使用，类似jquery方式引入
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ...components
}

export {
    install,
    TestDemo,
    DhCard
}