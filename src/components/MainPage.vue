<template>
  <div>
    <!--<div class="header">-->
    <!--<icon name="user" class="user-icon"></icon>-->
    <!--</div>-->

    <!--<cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler"></cube-scroll-nav-bar>-->

    <main-page-baidu-map v-if="baiduMapShow"></main-page-baidu-map>
    <main-page-list v-if="baiduMapShow===false"></main-page-list>

    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler">
    </cube-tab-bar>
  </div>
</template>

<script>
  import MainPageBaiduMap from "./MainPageBaiduMap"
  import MainPageList from './MainPageList'
  export default {
    name: "MainPage",
    components: {
      MainPageBaiduMap,
      MainPageList
    },
    data() {
      return {
        baiduMapShow: true,
        current: '地图查看',
        labels: [
          '地图查看',
          '案件列表',
          '情报列表',
        ],
        selectedLabelDefault: 'Vip',
        tabs: [{
          label: '地图查看',
          icon: 'cubeic-home'
        }, {
          label: '案件列表',
          icon: 'cubeic-like'
        }, {
          label: '情报列表',
          icon: 'cubeic-vip'
        }, {
          label: '我',
          icon: 'cubeic-person'
        }]
      }
    },
    methods: {
      clickHandler() {

      },
      changeHandler(cur) {
        this.current = cur
        if ('地图查看' === cur) {
          this.baiduMapShow = true;
        } else {
          this.baiduMapShow = false;
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    text-align: left;
  }

  .user-icon {
    margin-top: 10px;
    margin-left: 20px;
  }



</style>
