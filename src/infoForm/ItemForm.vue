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
  import Quagga from 'quagga';

  export default {
    name: "ItemForm",
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: false
      },
    },
    created() {
      //卷烟分类
      getDict('RES_TYPE').then(response => {
        this.schema.fields[0].props.options = mapToTextAndValue(response)
      })
    },
    watch: {
      visible(val) {
        this.showSelfItemFrom = val
      }
    },
    data: function () {
      return {
        showSelfItemFrom: false,
        fullHeight: document.documentElement.clientHeight - 56,
        validity: {},
        valid: undefined,
        formModel: {
          ID: '',
          CASE_TOBACCO_TYPE: '01', //卷烟分类 卷烟、雪茄烟、新型卷烟、烤烟、烟叶、复烤烟叶、再造烟叶、晾晒
          CASE_GOODS_ID_INPUT: [], //32位码扫描器文件对象
          CASE_GOODS_ID: '69码',//32位码
          CASE_GOODS_TYPE: '01',
          CAST_NAME: 'test物品名称',
          SPEC: 'test品牌规格', //品牌规格
          CASE_GOODS_QTY: 0, //数量
          GOOD_UNIT: '1', //单位 	根据物品自动识别-
          CASE_GOODS_PRICE: '', //涉案价格 根据物品自动识别
          remarks: '', //备注

          // "CASE_TOBACCO_TYPE": "20181210te", 涉案卷烟类型
          // "CASE_GOODS_ID": "20181210test", 32位码
          // "CASE_GOODS_TYPE": "01", 涉案物品类型
          // "CAST_NAME": "20181210test", 物品名称
          // "SPEC": "20181210test", 规格
          // "CASE_GOODS_PRICE": "123", 单价
          // "CASE_GOODS_QTY": "123", 数量
          // "GOOD_UNIT": "件", 单位
        },
        schema: {
          legend: this.title,
          fields: [
            {
              type: 'select',
              modelKey: 'CASE_TOBACCO_TYPE',
              label: '卷烟类型',
              props: {
                options: [
                  '其他辅料',
                  '国产烟机',
                  '进口烟机',
                  '非法拼装烟机',
                  '新型烟草制品',
                  '假冒商标']
              },
              rules: {
                required: true
              }
            },
            {
              type: 'upload',
              modelKey: 'CASE_GOODS_ID_INPUT',
              label: '条码扫描器',
              props: {
                max: 1,
                // ref: 'inputer',
                // style: 'background-color:red;',
                // type: 'file',
                placeholder: '请输入'
              },
              events: {
                'file-submitted': ({file}) => {
                  console.log('files-added', file)
                  getBarcodeFormImage(file).then(result => {
                    console.log(result)
                    this.formModel.CASE_GOODS_ID = result ? result.code : ''
                  }).catch(error=>console.log(error));
                }
              },
              rules: {
                required: false,
              },
            },
            {
              type: 'input',
              modelKey: 'CASE_GOODS_ID',
              label: '32位码',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'CASE_GOODS_TYPE',
              label: '物品类型',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'CAST_NAME',
              label: '物品名称',
              props: {
                readonly: true,
                placeholder: '根据物品自动识别'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'SPEC',
              label: '品牌规格',
              props: {
                readonly: true,
                placeholder: '根据物品自动识别'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'CASE_GOODS_QTY',
              label: '数量',
              props: {
                readonly: true,
                placeholder: '根据物品自动识别'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'GOOD_UNIT',
              label: '单位',
              props: {
                readonly: true,
                placeholder: '根据物品自动识别'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'CASE_GOODS_PRICE',
              label: '价格',
              props: {
                readonly: true,
                placeholder: '根据物品自动识别'
              },
              rules: {
                required: false
              },
            }, {
              type: 'input',
              modelKey: 'remarks',
              label: '备注',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: false
              },
            },
          ]
        },
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault()
        // this.$emit('submit', this.formModel)
        // this.$emit('update:visible', false)
        // console.log('submit', e)
        this.$refs.myForm.validate(valid => {
          if (valid) {
            // console.log(this.formModel);
            this.$emit('submit', [this.formModel])
            this.$emit('update:visible', false)
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
