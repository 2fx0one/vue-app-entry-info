<template>
  <div  :style="{width: '100%', height: fullHeight + 'px' }">
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

<script>
  import nationalSelectComponent from "@/components/ProviceCityAreaPickerComonent"
  import {getDict} from "@/api/case";
  import {mapToLabelAndValue, mapToTextAndValue} from "@/utils";

  export default {
    name: "PersonForm",
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: false
      },
    },
    created() {
      console.log('created PersonForm')
      //人员类型
      getDict('PERSONNEL_TYPE').then(response => {
        // console.log(response)
        this.schema.fields[0].props.options = mapToLabelAndValue(response)
      })

      //当事人类别
      getDict('PARTY_TYPE').then(response => {
        // console.log(response)
        this.schema.fields[1].props.options = mapToLabelAndValue(response)
      })

      //民族
      getDict('GB_MZ_1991').then(response => {
        console.log(response)
        this.schema.fields[15].props.options = mapToTextAndValue(response)
      })
      //角色 投资人、制假人、主要管理人员、....
      getDict('JOIN_ROLE').then(response => {
        // console.log(response)
        this.schema.fields[16].props.options = mapToTextAndValue(response)
      })

      //其他信息类别
      getDict('OTHER_TYPE').then(response => {
        // console.log(response)
        this.schema.fields[17].props.options = mapToTextAndValue(response)
      })

    },
    watch: {
      visible(val) {
        this.showSelfPersonFrom = val
      }
    },
    data() {
      return {
        showSelfPersonFrom: false,
        fullHeight: document.documentElement.clientHeight - 56,
        validity: {},
        valid: undefined,
        formModel: {
          ID: '',
          PERSON_TYPE: '01', //人员类型 下拉选择	当事人、同案人
          PARTY_TYPE: '01',  //当事人类别 个体、企业；
          NAME: '张三', //姓名
          usedName: 'test曾用名', //曾用名
          NICK_NAME: '', //绰号
          gender: '男',
          OCCUPATION: 'test职业', //职业
          workUnit: 'test工作单位', //工作单位
          PHONE: 'test139', //联系电话
          NATIVE_PLACE: ['110000', '110100', '110101'], //籍贯	是	下拉选择
          certType: '身份证', //证件类型	是	下拉选
          CARD_NUMBER: 'test证件号码', //证件号码	是
          ADDRESS: 'test住址',//身份证住址	是
          residenceAddress: '', //现居住地	是
          businessAddress: '', //经营地址	是
          NATION: '01',//民族	是	下拉选择
          NATIONALITY: '中国', //国籍
          JOIN_ROLE: '01',//角色 是	下拉选择 投资人、制假人、主要管理人员、财务管理人员、车主、司机、司乘人、藏匿人、销售人、运输人、小工、其他；
          OTHER_TYPE: '01',//其他信息类别 //是	下拉选择 虚拟身份、银行帐号、电话、其他；
          otherInfoContent: 'test其他信息',//其他信息内容
          Remarks: '',//备注	是
        },
        schema: {
          legend: this.title,
          fields: [
            {
              type: 'radio-group',
              modelKey: 'PERSON_TYPE',
              label: '人员类型',
              props: {
                options: ['同案人']
              },
              rules: {
                required: true
              },
              messages: {
                required: 'Please check this field'
              }
            },
            {
              type: 'radio-group',
              modelKey: 'PARTY_TYPE',
              label: '当事人类别',
              props: {
                options: ['企业']
              },
              rules: {
                required: true
              },
              messages: {
                required: 'Please check this field'
              }
            },
            {
              type: 'input',
              modelKey: 'NAME',
              label: '姓名',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              type: 'input',
              modelKey: 'usedName',
              label: '曾用名',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: false
              },
            },
            {
              type: 'input',
              modelKey: 'NICK_NAME',
              label: '绰号',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: false
              },
            },
            {
              type: 'radio-group',
              modelKey: 'gender',
              label: '性别',
              props: {
                options: ['男', '女']
              },
              horizontal: true,
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'OCCUPATION',
              label: '职业',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: false
              },
            },
            {
              type: 'input',
              modelKey: 'workUnit',
              label: '工作单位',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: false
              },
            },
            {
              type: 'input',
              modelKey: 'PHONE',
              label: '联系电话',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
            },
            {
              component: nationalSelectComponent,
              modelKey: 'NATIVE_PLACE',
              label: '籍贯',
              rules: {
                required: true
              }
            },
            //         certType: '', //证件类型	是	下拉选
            {
              type: 'select',
              modelKey: 'certType',
              label: '证件类型',
              props: {
                options: ['身份证', '驾驶证']
              },
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'CARD_NUMBER',
              label: '证件号码',
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              modelKey: 'ADDRESS',
              label: '住址',
              rules: {
                required: true
              }
            },
            // residenceAddress: '', //现居住地 	是
            {
              type: 'input',
              modelKey: 'residenceAddress',
              label: '现居住地',
              rules: {
                required: false
              }
            },
            // businessAddress: '', //经营地址	是
            {
              type: 'input',
              modelKey: 'businessAddress',
              label: '经营地址',
              rules: {
                required: false
              }
            },
            // national: '',//民族	是	下拉选择
            {
              type: 'select',
              modelKey: 'NATION',
              label: '民族',
              props: {
                options: []
              },
              rules: {
                required: true
              }
            },
            // role: '',//角色 是	下拉选择 投资人、制假人、主要管理人员、财务管理人员、车主、司机、司乘人、藏匿人、销售人、运输人、小工、其他；
            {
              type: 'select',
              modelKey: 'JOIN_ROLE',
              label: '角色',
              props: {
                options: [
                  '制假人',
                  '主要管理人员',
                  '财务管理人员',
                  '车主',
                  '司机',
                  '司乘人',
                  '藏匿人',
                  '销售人',
                  '运输人',
                  '小工',
                  '其他']
              },
              rules: {
                required: true
              }
            },
            // otherInfoType: '',//其他信息类别 //是	下拉选择 虚拟身份、银行帐号、电话、其他；
            {
              type: 'select',
              modelKey: 'OTHER_TYPE',
              label: '其他信息类别',
              props: {
                options: ['银行帐号', '电话', '其他']
              },
              rules: {
                required: false
              }
            },
            // otherInfoContent: '',//其他信息内容.
            {
              type: 'input',
              modelKey: 'otherInfoContent',
              label: '其他信息内容',
              rules: {
                required: false
              }
            },
            // Remarks: '',//备注	是
            {
              type: 'input',
              modelKey: 'Remarks',
              label: '备注',
              rules: {
                required: false
              }
            },
          ]
        }
      }
    },
    methods: {
      submitHandler(e) {
        // e.preventDefault()
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
        // console.log('submit', e)
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
