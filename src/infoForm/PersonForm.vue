<template>
  <div v-if="showSelfPersonFrom" :style="{width: '100%', height: fullHeight + 'px' }">
    <!--<cube-form-item></cube-form-item>-->
    <div>
      <cube-scroll :style="{width: '100%', height: fullHeight + 'px' }">
        <!--<p>涉案人员</p>-->
        <cube-form
          ref="myForm"
          :model="formModel"
          :schema="schema"
          :immediate-validate="false"
          :options="options"
          @validate="validateHandler"
        >
        </cube-form>
        <cube-button @click="submitHandler">下一步</cube-button>

      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import { provinceList, cityList } from './area'

  const cityData = provinceList
  cityData.forEach(province => {
    province.children = cityList[province.value]
  //   // province.children.forEach(city => {
  //   //   city.children = areaList[city.value]
  //   // })
  })
  //籍贯选择
  const nationalSelectComponent = {
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        selected: []
      }
    },
    render(createElement) {
      return createElement('cube-button', {
        props: {
          light: true
        },
        on: {
          click: this.showPicker
        }
      }, this.selected.length ? this.selected.join(' ') : '点击选择籍贯')
    },
    mounted() {
      this.picker = this.$createCascadePicker({
        title: '籍贯选择',
        data: cityData,
        selectedIndex: this.value,
        onSelect: this.selectHandler
      })
    },
    methods: {
      showPicker() {
        this.picker.show()
      },
      selectHandler(selectedVal, selectedIndex, selectedTxt) {
        this.selected = selectedTxt
        this.$emit('input', selectedVal)
      }
    }
  }

  export default {
    name: "PersonForm",
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: false
      },
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
          personType: '当事人', //人员类型 下拉选择	当事人、同案人
          a: '个体',  //当事人类别 个体、企业；
          name: '', //姓名
          usedName: '', //曾用名
          nickname: '', //绰号
          gender: '男',
          career: '', //职业
          workUnit: '', //工作单位
          contactNumber: '', //联系电话	是
          hometown: [], //籍贯	是	下拉选择
          certType: '', //证件类型	是	下拉选
          certId: '', //证件号码	是
          certAddress: '',//身份证住址	是
          residenceAddress: '', //现居住地	是
          businessAddress: '', //经营地址	是
          national: '',//民族	是	下拉选择
          role: '',//角色 是	下拉选择 投资人、制假人、主要管理人员、财务管理人员、车主、司机、司乘人、藏匿人、销售人、运输人、小工、其他；
          otherInfoType: '',//其他信息类别 //是	下拉选择 虚拟身份、银行帐号、电话、其他；
          otherInfoContent: '',//其他信息内容
          Remarks: '',//备注	是
        },
        schema: {
          groups: [
            {
              legend: this.title,
              fields: [
                {
                  type: 'radio-group',
                  modelKey: 'personType',
                  label: '人员类型',
                  props: {
                    options: ['当事人', '同案人']
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
                  modelKey: 'a',
                  label: '当事人类别',
                  props: {
                    option: ['个体', '企业']
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
                  modelKey: 'name',
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
                  modelKey: 'nickname',
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
                  modelKey: 'career',
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
                  modelKey: 'contactNumber',
                  label: '联系电话',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: false
                  },
                },
                {
                  // type: 'select',
                  component: nationalSelectComponent,
                  modelKey: 'hometown',
                  label: '籍贯',
                  // props: {
                  //   options: [2015, 2016, 2017, 2018, 2019, 2020]
                  // },
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
                  modelKey: 'certId',
                  label: '证件号码',
                  rules: {
                    required: true
                  }
                },
                {
                  type: 'input',
                  modelKey: 'certAddress',
                  label: '身份证住址',
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
                    required: true
                  }
                },
                // businessAddress: '', //经营地址	是
                {
                  type: 'input',
                  modelKey: 'businessAddress',
                  label: '经营地址',
                  rules: {
                    required: true
                  }
                },
                // national: '',//民族	是	下拉选择
                {
                  type: 'input',
                  modelKey: 'national',
                  label: '民族',
                  rules: {
                    required: true
                  }
                },
                // role: '',//角色 是	下拉选择 投资人、制假人、主要管理人员、财务管理人员、车主、司机、司乘人、藏匿人、销售人、运输人、小工、其他；
                {
                  type: 'select',
                  modelKey: 'role',
                  label: '角色',
                  props: {
                    options: ['投资人',
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
                  modelKey: 'otherInfoType',
                  label: '其他信息类别',
                  props: {
                    options: ['虚拟身份','银行帐号','电话','其他']
                  },
                  rules: {
                    required: true
                  }
                },
                // otherInfoContent: '',//其他信息内容.
                {
                  type: 'input',
                  modelKey: 'otherInfoContent',
                  label: '其他信息内容',
                  rules: {
                    required: true
                  }
                },
                // Remarks: '',//备注	是
                {
                  type: 'input',
                  modelKey: 'Remarks',
                  label: '备注',
                  rules: {
                    required: true
                  }
                },
                // {
                //   type: 'textarea',
                //   modelKey: 'textareaValue',
                //   label: 'Textarea',
                //   rules: {
                //     required: true
                //   },
                //   // debounce validate
                //   // if set to true, the default debounce time will be 200(ms)
                //   debounce: 100
                // }
              ]
            },
          ]
        },
        options: {
          scrollToInvalidField: true,
          layout: 'standard' // classic fresh
        }
      }
    },
    methods: {
      submitHandler(e) {
        // e.preventDefault()
        this.$refs.myForm.validate(valid => {
          if (valid) {
            // console.log(this.formModel);
            this.$emit('submit', this.formModel)
            this.$emit('update:visible', false)
          }
        });
        // console.log('submit', e)
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      resetHandler(e) {
        console.log('reset', e)
      }
    }
  }
</script>

<style scoped>

</style>
