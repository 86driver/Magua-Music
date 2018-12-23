import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/less/index.less'
import wcSwiper from 'wc-swiper' // 轮播图插件
import VueLazyload from 'vue-lazyload' // 图片懒加载插件
import 'wc-swiper/style.css'
import store from './store'

Vue.use(wcSwiper)
Vue.use(VueLazyload, {
  loading: require('assets/images/cd.png'),
  error: require('assets/images/cd.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
