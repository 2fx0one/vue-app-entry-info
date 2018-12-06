import Vue from 'vue'
import VueAMap from 'vue-amap';
import './cube-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

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
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '8850398372012a062a0e0b78d6279445',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
