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
               class="bm-view">
      <bm-marker v-for="marker in markers" :position="{lng: marker.lng, lat: marker.lat}" @click="clickHandler(marker)">
        <bm-label :content="marker.labelName" :labelStyle="{color: 'red', fontSize : '14px'}"
                  :offset="{width: -10, height: 30}"/>
      </bm-marker>
      <bm-info-window v-for="marker in markers"
                      :position="{lng: marker.lng, lat: marker.lat}"
                      :title="marker.infoWindowTitle"
                      :show="marker.infoWindowShow"
                      @close="infoWindowClose(marker)"
                      @open="infoWindowOpen(marker)">
        <p v-text="marker.infoWindowContent"></p>
        <!--<button @click="infoWindowClose(marker)">Clear</button>-->
      </bm-info-window>


      <!--<bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT">-->
        <!--&lt;!&ndash;<cube-checkbox-group&ndash;&gt;-->
        <!--&lt;!&ndash;style="position: fixed; bottom: 100px"&ndash;&gt;-->
        <!--&lt;!&ndash;v-model="checkList"&ndash;&gt;-->
        <!--&lt;!&ndash;:options="options"&ndash;&gt;-->
        <!--&lt;!&ndash;:horizontal="true"&ndash;&gt;-->
        <!--&lt;!&ndash;shape="square"&ndash;&gt;-->
        <!--&lt;!&ndash;:hollow-style="true"&ndash;&gt;-->
        <!--&lt;!&ndash;@click="clickCheckBox">&ndash;&gt;-->
        <!--&lt;!&ndash;</cube-checkbox-group>&ndash;&gt;-->
        <!--<cube-button :inline="true" @click="btnClick()">经营户</cube-button>-->
        <!--<cube-button :inline="true" @click="btnClick()">案件</cube-button>-->
        <!--<cube-button :inline="true" @click="btnClick()">情报</cube-button>-->
      <!--</bm-control>-->


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
  export default {
    name: "MainPageBaiduMap",
    created() {
      console.log(this.fullHeight);
    },
    watch: {
      checkList: function (newVal, oldVal) {
        // console.log(newVal)
        // console.log(oldVal)
        let markers = []
        for (let i = 0; i < 10; i++) {
          markers.push({
            lng: Math.random() + 115,
            lat: Math.random() + 28,
            labelName: '案件名称' + i,
            infoWindowShow: false,
            infoWindowTitle: '标题' + i,
            infoWindowContent: '案件内容' + i,

          })
        }
        this.markers = markers;
      }
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
          {
            lng: Math.random() + 115,
            lat: Math.random() + 28,
            labelName: '案件名称',
            infoWindowShow: false,
            infoWindowTitle: '标题',
            infoWindowContent: '案件内容'
          }
        ],
        center: {lng: 115.89, lat: 28.68},
        zoom: 10,
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
