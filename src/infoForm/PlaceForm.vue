<template>
  <div :style="{width: '100%', height: fullHeight + 'px' }">
    <!--<cube-form-item></cube-form-item>-->
    <div>
      <cube-scroll :style="{width: '100%', height: fullHeight + 'px' }">
        <p>{{title}}</p>
        <cube-form
          ref="myForm"
          :model="formModel"
          :schema="schema"
          :immediate-validate="false"
          @validate="validateHandler"
        >
        </cube-form>
        <cube-button @click="submitHandler">下一步</cube-button>

      </cube-scroll>
    </div>
  </div>
</template>

<!--物品分类 是	下拉选择-->
<!--卷烟、雪茄烟、新型卷烟、烤烟、烟叶、复烤烟叶、再造烟叶、晾晒烟、烟丝、卷烟纸、烟用丝束、滤嘴棒、其他辅料、国产烟机、进口烟机、非法拼装烟机、新型烟草制品、假冒商标；-->
<!--*品牌规格	 是	下拉选择	参考《全国卷烟在销目录》，可通过关键字、条形码查找-->
<!--*数量	是-->
<!--单位	否		根据物品自动识别-->
<!--涉案价格	否		根据物品自动识别-->
<!--32位喷码	是		支持批量导入-->
<!--备注	是-->

<script>
  import {getDict} from "@/api/case";
  import {getBarcodeFormImage, mapToLabelAndValue, mapToTextAndValue} from "@/utils";

  export default {
    // name: "PlaceForm",
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: false
      },
    },
    created() {
      //卷烟分类
      getDict('PLACE_TYPE').then(response => {
        this.schema.fields[1].props.options = mapToTextAndValue(response)
      })
    },
    watch: {
      visible(val) {
        this.showSelfPlaceFrom = val
      }
    },
    data: function () {
      let location = JSON.parse(sessionStorage.getItem('location'))
      if (!location) {
        location = this.$store.getters.location
      }
      return {
        showSelfPlaceFrom: false,
        fullHeight: document.documentElement.clientHeight - 56,
        validity: {},
        valid: undefined,
        formModel: {
          ID: '',
          HIDEOUTNAME: "test涉案地点名称", //涉案地点名称
          HIDEOUTYPE: "01", //涉案地点类别 PLACE_TYPE
          ADDRESS: "test 地址", //地址
          GRID: "test网格", //所属网格
          LONGTITUDE: location['lng'],
          LATITUDE: location['lat']

        },
        schema: {
          legend: this.title,
          fields: [
            {
              type: 'input',
              modelKey: 'HIDEOUTNAME',
              label: '涉案地点名称',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'select',
              modelKey: 'HIDEOUTYPE',
              label: '涉案地点类别',
              props: {
                options: [
                  '其他',
                ]
              },
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'ADDRESS',
              label: '地址',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'GRID',
              label: '所属网格',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'LONGTITUDE',
              label: '经度',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'LATITUDE',
              label: '纬度',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },

          ]
        },
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault()
        this.$refs.myForm.validate(valid => {
          if (valid) {
            // console.log(this.formModel);
            this.$emit('submit', [this.formModel])
            // this.$emit('update:visible', false) //TODO
          } else {
            this.$createToast({
              time: 1000,
              type: 'txt',
              txt: '存在必填项，请检查表单'
            }).show()
          }
        });
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        // console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      resetHandler(e) {
        // console.log('reset', e)
      }
    }
  }
</script>

<style scoped>

</style>
