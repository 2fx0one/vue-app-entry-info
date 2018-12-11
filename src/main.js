import Vue from 'vue'
import './cube-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)


import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'qX6nyMAr7zAKWaGe5kmiPRVGitzXmgDj'
})

import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

Vue.component('ImgInputer', ImgInputer)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
