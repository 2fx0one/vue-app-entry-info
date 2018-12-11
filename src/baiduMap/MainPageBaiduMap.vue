<template>
  <div>
    <!--<cube-input v-model="keyword" :eye="eye" :placeholder="'请输入地址'"></cube-input>-->
    <!--<label>关键词：<input v-model="keyword"></label>-->
    <!--<label>地区：<input v-model="location"></label>-->
    <div>
      <cube-checkbox-group
        v-model="checkList"
        :options="options"
        :horizontal="true"
        shape="square"
        :hollow-style="true"
        @click="clickCheckBox">
      </cube-checkbox-group>
    </div>
    <!--{{fullHeight}}-->
    <baidu-map :center="center" :zoom="zoom"
               :style="{width: '100%', height: baiduMapHeight + 'px' }"
               @ready="handlerBaiduMapReady"
               class="bm-view">
      <bm-marker v-for="item in markers" :position="{lng: item.lng, lat: item.lat}" @click="clickHandler(item)">
        <bm-label :content="item.labelName" :labelStyle="{color: 'red', fontSize : '14px'}"
                  :offset="{width: -10, height: 30}"/>
      </bm-marker>
      <bm-info-window v-for="item in markers"
                      :position="{lng: item.lng, lat: item.lat}"
                      :title="item.infoWindowTitle"
                      :show="item.infoWindowShow"
                      @close="infoWindowClose(item)"
                      @open="infoWindowOpen(item)">
        <p v-text="item.infoWindowContent"></p>
        <!--<button @click="infoWindowClose(marker)">Clear</button>-->
      </bm-info-window>

      <bm-control>
        <!--<button @click="openDistanceTool">开启测距</button>-->
        <cube-input v-model="keyword" :eye="eye" :placeholder="'请输入搜索地址'"></cube-input>
      </bm-control>


      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
      <div>
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
          locationSuccess="locationSuccess"
        ></bm-geolocation>

      </div>
    </baidu-map>


  </div>
</template>

<script>
  import store from '../store/index'
  import {caseList} from '@/api/case'
  export default {
    name: "MainPageBaiduMap",
    created() {
      caseList({}).then(response => {
        console.log(response)
        this.markers = response.filter(v => v.gisLongitude && v.gisLatitudes).map(v=>
          ({
          lng: v.gisLongitude,
          lat: v.gisLatitudes,
          labelName: v.caseName,
          infoWindowShow: false,
          infoWindowTitle: '标题' ,
          infoWindowContent: '案件内容'
        }))
        console.log(this.markers)
      }).catch(err => console.log(err))
      // console.log(this.fullHeight);
    },
    watch: {
      // checkList: function (newVal, oldVal) {
      //   // console.log(newVal)
      //   // console.log(oldVal)
      //   let markers = []
      //   for (let i = 0; i < 10; i++) {
      //     markers.push({
      //       lng: Math.random() + 115,
      //       lat: Math.random() + 28,
      //       labelName: '案件名称' + i,
      //       infoWindowShow: false,
      //       infoWindowTitle: '标题' + i,
      //       infoWindowContent: '案件内容' + i,
      //
      //     })
      //   }
      //   this.markers = markers;
      // }
    },
    data() {
      return {
        eye: {
          open: true,
          reverse: false
        },
        location: '江西',
        keyword: '',
        baiduMapHeight: document.documentElement.clientHeight - 102,
        markers: [
          // {
          //   lng: Math.random() + 115,
          //   lat: Math.random() + 28,
          //   labelName: '案件名称',
          //   infoWindowShow: false,
          //   infoWindowTitle: '标题',
          //   infoWindowContent: '案件内容'
          // }
        ],
        center: {lng: 115.89, lat: 28.68},
        zoom: 9,
        checkList: ['1', '2', '3'],
        options: [
          {
            label: '经营户',
            value: '1',
          },
          {
            label: '案件',
            value: '2',
          },
          {
            label: '情报',
            value: '3',
          },
          // {
          //   label: '3',
          //   value: '3',
          // },
          // {
          //   label: '4',
          //   value: '4',
          //   // disabled: true
          // }
        ]
      }
    },
    methods: {
      handlerBaiduMapReady({BMap, map}) {
        // let _this = this;   // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        // var geolocation = new BMap.Geolocation();
        new BMap.Geolocation().getCurrentPosition( (result) => {
            this.center = {lng: result.longitude, lat: result.latitude};     // 设置center属性值
          // this.autoLocationPoint = {lng: result.longitude, lat: result.latitude};      // 自定义覆盖物
          // this.initLocation = true;
            console.log('center:', this.center)    // 如果这里直接使用this是不行的
            this.$store.dispatch("updateLocation", this.center);

        }, {enableHighAccuracy: true})
      },
      clickHandler(marker) {
        marker.infoWindowShow = true;
      },
      infoWindowClose(marker) {
        marker.infoWindowShow = false;
      },
      infoWindowOpen(marker) {
        marker.infoWindowShow = true;
      },
      btnClick(v) {
        console.log(v)
      },
      clickCheckBox() {
        console.log(this.checkList)
      },
      locationSuccess(point, AddressComponent, marker) {
        console.log(point);
      }
    }
  }
</script>

<style scoped>
  .bm-view {
    /*width: 100%;*/
    /*height: 500px;*/
  }

  .bm-view >>> .anchorBL {
    display: none;
  }

  .bm-view >>> .BMap_noprint {
    position: fixed;
    bottom: 0px;
  }

  cube-button {
    left: 10px;
    margin-bottom: 10px;
  }
</style>
