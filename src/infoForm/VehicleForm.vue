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
<!--*车牌号	是-->
<!--涉案关系-->
<!--是	下拉选择-->
<!--车型--> <!--是-->
<!--品牌型号	是-->
<!--颜色-->
<!--是	下拉选择-->
<!--车辆识别码	是-->
<!--运输路线	是-->
<!--车辆描述	是-->
<!--行驶证号	是-->
<!--照片	是-->
<!--备注	是-->

<script>
  import {getDict} from "@/api/case";
  import {mapToLabelAndValue, mapToTextAndValue} from "@/utils";
  import DataTimePickerComponent from "@/components/DataTimePickerComponent";

  export default {
    name: "VehicleForm",
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: false
      },
    },
    created() {
      //卷烟分类
      getDict('CASE_RELATION').then(response => {
        this.schema.fields[1].props.options = mapToTextAndValue(response)
      })

      getDict('VEHICLE_TYPE').then(response => {
        this.schema.fields[3].props.options = mapToTextAndValue(response)
      })

      getDict('VEHICLE_COLOR').then(response => {
        this.schema.fields[5].props.options = mapToTextAndValue(response)
      })

      getDict('TRANSPORT_WAY').then(response => {
        this.schema.fields[8].props.options = mapToTextAndValue(response)
      })
    },
    watch: {
      visible(val) {
        this.showSelfVehicleFrom = val
      }
    },
    data() {
      return {
        showSelfVehicleFrom: false,
        fullHeight: document.documentElement.clientHeight - 56,
        validity: {},
        valid: undefined,
        formModel: {
          ID: '',
          PLATE_NUMBER: 'test车牌号', // 车牌号
          CASE_RELATION: '01', //涉案关系 select 运输车辆、载乘车辆、其他车辆；
          DRIVER_INFO: 'test驾驶员信息', //驾驶员信息
          VEHICLE_MODEL: '01', //车型 摩托车、商务车、SUV、轿车、卡车、面包车、客车、小货车、其他 VEHICLE_TYPE
          PLATE_BRAND: 'test品牌型号', //品牌型号
          COLOR: '01', //颜色 红色、黄色、蓝色、白色、黑色、金色、绿色、灰色、棕色、银色、其他； VEHICLE_COLOR
          CAPATICY: 'test载重', //载重
          VEHICLE_CODE: 'test车辆识别码', //车辆识别码
          TRANSPORT_WAY: '01', //运输路线 select
          VEHICLE_DESCRIBE: 'test车辆描述', //车辆描述
          DRIVING_LICENSE: 'test行驶证号', //行驶证号
          VEHICLE_PROPERTY: 'test车辆属性', //车辆属性
          SEIZURE_DATE: [2018,12,12, 1,1,1], //查获时间
          OWNER: 'test产权人', //产权人
          PHOTO: [], //照片
          REMARKS: '' //备注
        },
        schema: {
          legend: this.title,
          fields: [
            {
              type: 'input',
              modelKey: 'PLATE_NUMBER',
              label: '车牌号',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'select',
              modelKey: 'CASE_RELATION',
              label: '涉案关系',
              props: {
                options: ['运输车辆', '载乘车辆']
              },
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'DRIVER_INFO',
              label: '驾驶员信息',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'select',
              modelKey: 'VEHICLE_MODEL',
              label: '车型',
              props: {
                options: ['小货车', '其他']
              },
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'PLATE_BRAND',
              label: '品牌型号',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'select',
              modelKey: 'COLOR',
              label: '车辆颜色',
              props: {
                options: []
              },
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'CAPATICY',
              label: '载重',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'VEHICLE_CODE',
              label: '车辆识别码',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'select',
              modelKey: 'TRANSPORT_WAY',
              label: '运输路线',
              props: {
                options: []
              },
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'VEHICLE_DESCRIBE',
              label: '车辆描述',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'DRIVING_LICENSE',
              label: '行驶证号',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'VEHICLE_PROPERTY',
              label: '车辆属性',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: false
              },
            },
            {
              component: DataTimePickerComponent,
              // type: 'input',
              modelKey: 'SEIZURE_DATE',
              label: '案发时间',
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'OWNER',
              label: '产权人',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'upload',
              modelKey: 'PHOTO',
              label: '照片',
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
                }
              },
              rules: {
                required: false,
              },
            },
            {
              type: 'input',
              modelKey: 'REMARKS',
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
