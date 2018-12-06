<template>
  <div :style="{width: '100%', height: fullHeight + 'px' }">
    <!--<cube-index-list-->
    <!--:data="cityData"-->
    <!--:title="title"-->
    <!--@select="selectItem"-->
    <!--&gt;</cube-index-list>-->
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

    <div :style="{width: '100%', height: fullHeight-50 + 'px' }">
      <cube-scroll>
        <cube-swipe
          @item-click="onItemClick"
          @btn-click="onBtnClick"
          :data="swipeData">
        </cube-swipe>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MainPageList",
    created() {
      let swipeData = [];
      for (let i = 0; i < 100; i++) {
        swipeData.push({
          item: {
            text: '测试' + i,
            value: i
          },
          btns: [
            // {
            //   action: 'clear',
            //   text: '不再关注',
            //   color: '#c8c7cd'
            // },
            {
              action: 'delete',
              text: '编辑',
              color: '#ff3a32'
            }
          ]
        })
      }
      this.swipeData = swipeData;
    },
    data() {
      return {
        fullHeight: document.documentElement.clientHeight - 56,
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
          }
        ],
        swipeData: [{
          item: {
            text: '测试1',
            value: 1
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd'
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        }],
        // title: 'Current City: BEIJING',
        // cityData: [
        //   {
        //     "name": "★Hot City",
        //     "items": [
        //       {
        //         "name": "BEIJING",
        //         "value": 1
        //       },
        //       {
        //         "name": "SHANGHAI",
        //         "value": 2
        //       }
        //     ]
        //   },
        //   {
        //     "name": "A",
        //     "items": [
        //       {
        //         "name": "ANSHAN",
        //         "value": 3
        //       },
        //       {
        //         "name": "ANQING",
        //         "value": 4
        //       }
        //     ]
        //   }
        // ]
      }
    },
    methods: {
      clickCheckBox() {
        console.log(this.checkList)
      },
      selectItem(item) {
        console.log('selectItem item:', item)
      },
      onItemClick(item) {
        console.log('click item:', item)
      },
      onBtnClick(btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.swipeData.splice(index, 1)
            }
          }).show()
        }
      }
    },
    // computed: {
    //   options() {
    //     return {
    //       // scrollbar: this.scrollbarObj,
    //       startY: this.startY
    //     }
    //   }
    // }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .swipe-wrapper {
    height 500px;
  }

  .scroll-list-wrap {
    height: 500px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden;
  }
</style>
