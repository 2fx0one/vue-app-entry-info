<template>
  <div>
    <!--<div class="header">-->
    <!--<icon name="user" class="user-icon"></icon>-->
    <!--</div>-->

    <!--<cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler"></cube-scroll-nav-bar>-->

    <main-page-baidu-map v-if="currentView==='map'"></main-page-baidu-map>
    <main-page-list v-if="currentView==='list'"></main-page-list>
    <main-page-form v-if="currentView==='form'" @submit="mainPageSubmitFrom"></main-page-form>

    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeTabBarHandler">
    </cube-tab-bar>
  </div>
</template>

<script>
  import MainPageBaiduMap from "../baiduMap/MainPageBaiduMap"
  import MainPageList from './MainPageList'
  import MainPageForm from "./MainPageForm";
  import BaseForm from "../infoForm/BaseForm";

  export default {
    name: "MainPage",
    components: {
      MainPageForm,
      // BaseForm,
      MainPageBaiduMap,
      MainPageList
    },
    data() {
      return {
        // currentView: 'form',
        currentView: 'map',
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
          label: '案件录入',
          icon: 'cubeic-scan'
        }, {
          label: '情报录入',
          icon: 'cubeic-scan'
        }]
      }
    },
    methods: {
      clickHandler() {

      },
      changeTabBarHandler(cur) {
        let opt = {
          '地图查看': 'map',
          '列表查看': 'list',
          '案件录入': 'form',
          '情报录入': 'form'
        }
        if (this.currentView === 'form') {
          this.$createDialog({
            type: 'confirm',
            icon: 'cubeic-alert',
            title: '表单中未提交内容会清空！',
            content: '确定离开表单页面吗？',
            confirmBtn: {
              text: '确定离开',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            cancelBtn: {
              text: '留在表单',
              active: false,
              disabled: false,
              href: 'javascript:;'
            },
            onConfirm: () => {
              this.currentView = opt[cur]
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: '点击确认按钮'
              }).show()
            },
            onCancel: () => {
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: '点击取消按钮'
              }).show()
            }
          }).show()
        } else {
          this.currentView = opt[cur]
        }
      },
      mainPageSubmitFrom(val) {
        console.log(val)
        this.currentView = 'map'
        this.selectedLabelDefault = '地图查看'

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
