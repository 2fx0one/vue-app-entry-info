<template>
  <div>
    <!--<div class="header">-->
    <!--<icon name="user" class="user-icon"></icon>-->
    <!--</div>-->

    <!--<cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler"></cube-scroll-nav-bar>-->

    <main-page-baidu-map v-if="currentView==='map'"></main-page-baidu-map>
    <main-page-list v-else-if="currentView==='list'"></main-page-list>
    <main-page-form v-else-if="currentView==='form'"></main-page-form>
    <main-page-baidu-map v-else></main-page-baidu-map>

    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeTabBarHandler">
    </cube-tab-bar>
  </div>
</template>

<script>
  import MainPageBaiduMap from "./MainPageBaiduMap"
  import MainPageList from './MainPageList'
  import MainPageForm from "./MainPageForm";
  export default {
    name: "MainPage",
    components: {
      MainPageForm,
      MainPageBaiduMap,
      MainPageList
    },
    data() {
      return {
        currentView: 'form',
        // currentLabels: '地图查看',
        // labels: [
        //   '地图查看',
        //   '案件列表',
        //   '情报列表',
        // ],
        selectedLabelDefault: '地图查看',
        tabs: [{
          label: '地图查看',
          icon: 'cubeic-navigation'
        }, {
          label: '列表查看',
          icon: 'cubeic-mobile-phone'
        }, {
          label: '信息录入',
          icon: 'cubeic-scan'
        }, {
          label: '我是谁',
          icon: 'cubeic-person'
        }]
      }
    },
    methods: {
      clickHandler() {

      },
      changeTabBarHandler(cur) {
        let opt = {
          '地图查看' : 'map',
          '列表查看' : 'list',
          '信息录入' : 'form'
        }
        this.currentView = opt[cur]
        // this.current = cur
        // if ('地图查看' === cur) {
        //   this.baiduMapShow = 'map';
        // } else if ('列表查看' === cur) {
        //   this.baiduMapShow = 'list';
        // }
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
