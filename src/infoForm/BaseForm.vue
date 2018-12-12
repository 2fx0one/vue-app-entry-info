<template>
  <div v-if="showSelfBaseForm" :style="{width: '100%', height: fullHeight + 'px' }">
    <!--<div>-->
    <!--<cube-radio-group v-model="currentRadioSelect" :options="options" :horizontal="true"/>-->
    <!--<cube-checkbox-group-->
    <!--v-model="checkList"-->
    <!--:options="options"-->
    <!--:horizontal="true"-->
    <!--shape="square"-->
    <!--:hollow-style="true"-->
    <!--@click="clickCheckBox">-->
    <!--</cube-checkbox-group>-->
    <!--</div>-->


    <pop-radio-group
      :title="'主案由'"
      :visible.sync="popMainCaseReasonShow"
      :currentSelect="formModel.mainCaseReason"
      :options="fields['mainCaseReason'].props.options"
      @change="mainCaseReasonChange"
      :height="fullHeight">
    </pop-radio-group>

    <!--辅案由弹窗-->
    <pop-check-box-group
      :title="'辅案由'"
      :visible.sync="popSecretaryCaseReasonShow"
      :currentSelect="formModel.secretaryCaseReason"
      :options="fields['secretaryCaseReason'].props.options"
      @change="secretaryCaseReasonChange"
      :height="fullHeight">
    </pop-check-box-group>


    <div>
      <cube-scroll :style="{width: '100%', height: fullHeight + 'px' }">
        <!--<cube-form ref="myForm" :model="formModel" @validate="validateHandler" @submit="submitHandler">-->
        <cube-form ref="myForm" :model="formModel" @validate="validateHandler">
          <!--<p>{{title}}</p>-->
          <cube-form-group :legend="title">
            <!--<cube-form-item v-for="index in 11" v-key="" :field="fields[index]"></cube-form-item>-->
            <cube-form-item :field="fields['CASE_ID']"></cube-form-item>
            <cube-form-item :field="fields['CASE_NAME']"></cube-form-item>
            <cube-form-item :field="fields['CASE_GOODS_AMT']"></cube-form-item>
            <cube-form-item :field="fields['CASE_DATE']"></cube-form-item>
            <cube-form-item :field="fields['CASE_PLACE']"></cube-form-item>
            <cube-form-item :field="fields['GIS_LONGITUDE']"></cube-form-item>
            <cube-form-item :field="fields['GIS_LATITUDES']"></cube-form-item>
            <cube-form-item :field="fields['EVIDENCE_TYPE']">
              <!--<cube-checkbox-group v-model="formModel.EVIDENCE_TYPE" :options="formOptions.EVIDENCE_TYPE_OPTIONS" />-->
            </cube-form-item>
            <cube-form-item :field="fields['CASE_SOURCE']"></cube-form-item>
            <cube-form-item :field="fields['MANAGE_TYPE']"></cube-form-item>
            <cube-form-item :field="fields['caseSourceLocation']"></cube-form-item>
            <cube-form-item :field="fields['caseGoesLocation']"></cube-form-item>

            <!--主案由-->
            <cube-form-item :field="fields['mainCaseReason']">
              <p style="font-size:16px; text-align: left"
                 @click="popMainCaseReasonShow = true" :light="true">{{formModel.mainCaseReasonLabel || ' 点击选择主案由'}}
              </p>
            </cube-form-item>

            <!--辅案由-->
            <cube-form-item :field="fields['secretaryCaseReason']">
              <p style="font-size:14px; text-align: left"
                 v-for="(reason, key) in formModel.secretaryCaseReasonLabels"
                 :key="reason.id"
                 @click="popSecretaryCaseReasonShow = true" :light="true">{{key+1 + " : " + reason || ' 点击选择辅案由'}}
              </p>
            </cube-form-item>


            <!--ASSIST_UNIT-->
            <cube-form-item :field="fields['ASSIST_UNIT']"></cube-form-item>

            <!-- IS_MARKET -->
            <cube-form-item :field="fields['IS_MARKET']"></cube-form-item>

            <!--MARKET_NAME-->
            <cube-form-item v-if="formModel.IS_MARKET" :field="fields['MARKET_NAME']"></cube-form-item>

            <!--IS_TRANSPORT_CASE-->
            <cube-form-item :field="fields['IS_TRANSPORT_CASE']"></cube-form-item>
            <!--TRANSPORTTYPE-->
            <cube-form-item v-if="formModel.IS_TRANSPORT_CASE" :field="fields['TRANSPORTTYPE']"></cube-form-item>
            <!--TRANSPORT_CASE_PLACE-->
            <cube-form-item v-if="formModel.IS_TRANSPORT_CASE" :field="fields['TRANSPORT_CASE_PLACE']"></cube-form-item>

            <!--许可号 LICENSE_CODE -->
            <cube-form-item :field="fields['LICENSE_CODE']"></cube-form-item>
          </cube-form-group>


          <cube-button @click="submitHandler">下一步</cube-button>

        </cube-form>
      </cube-scroll>
    </div>


  </div>
</template>

<script>
  import PopCheckBoxGroup from "../components/PopCheckBoxGroup";
  import PopRadioGroup from "../components/PopRadioGroup";
  import caseSourceLocationPicker from "@/components/ProviceCityAreaPickerComonent"
  import caseGoesLocationPicker from "@/components/ProviceCityAreaPickerComonent"
  import DataTimePickerComponent from "@/components/DataTimePickerComponent"
  import {getDict} from "@/api/case";
  import {mapToLabelAndValue, mapToTextAndValue} from "@/utils";


  export default {
    name: "BaseForm",
    components: {PopRadioGroup, PopCheckBoxGroup},
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: true
      },
    },
    created() {
      //CHECKBOX 证据类型
      getDict('EVIDENCE_TYPE').then(response => {
        // console.log(response)
        this.fields.EVIDENCE_TYPE.props.options = mapToLabelAndValue(response)
      })
      //SELECT 案件来源
      getDict('CASE_SOURCE').then(response => {
        // console.log(response)
        this.fields.CASE_SOURCE.props.options =  mapToTextAndValue(response)
      })

      //案件类型 CASE_TYPE
      getDict('CASE_TYPE').then(response => {
        // console.log(response)
        this.fields.MANAGE_TYPE.props.options =  mapToTextAndValue(response)
      })

      //案由 分为主 和 辅
      getDict('CASE_ORIGIN').then(response => {
        // console.log(response)
        this.fields.mainCaseReason.props.options = mapToLabelAndValue(response)

        this.fields.secretaryCaseReason.props.options = mapToLabelAndValue(response)
      })

      getDict('TRANSPORT_WAY').then(response => {
        // console.log(response)
        this.fields.TRANSPORTTYPE.props.options = mapToTextAndValue(response)
      })

      getDict('TRANSPORT_CASE_ADDRESS').then(response => {
        // console.log(response)
        this.fields.TRANSPORT_CASE_PLACE.props.options = mapToTextAndValue(response)
      })
    },
    watch: {
      visible(val) {
        this.showSelfBaseForm = val
      }
    },
    data() {
      // sessionStorageFormDate = JSON.parse(sessionStorage.getItem(''));
      let location = JSON.parse(sessionStorage.getItem('location'))
      if (!location) {
        location = this.$store.getters.location
      }

      return {
        showSelfBaseForm: true,
        popEvidenceShow: false, //证据类型由弹窗
        popMainCaseReasonShow: false, //主案由弹窗
        popSecretaryCaseReasonShow: false, //辅助按钮弹窗
        fullHeight: document.documentElement.clientHeight - 56,

        formModel: {
          CASE_ID: 'test测试编号',
          CASE_NAME: 'test测试名字',
          CASE_GOODS_AMT: '',
          CASE_DATE: [2018, 12, 12, 12, 12, 12], //案发时间
          CASE_PLACE: 'test案发', //案发地点
          GIS_LONGITUDE: location['lng'],//store.state.location['lng'], // 经度
          GIS_LATITUDES: location['lat'], //store.state.location['lat'], // 纬度
          EVIDENCE_TYPE: ['01'], //证据类型 	复选 书证、物证、鉴定结论、勘验笔录、询问笔录、证人证言、视听资料、其他；
          CASE_SOURCE: '01',// 案件来源	  投诉举报、市场查获、案件移交、指定管辖、上级交办、其他；

          MANAGE_TYPE: '02',

          //TODO 为定义格式 先不处理
          caseSourceLocation: ['110000', '110100', '110101'],// 案件来源指向地	是		省市区（县），参考字典
          caseGoesLocation: ['110000', '110100', '110101'],// 案件去向指向地	是 省市区（县），参考字典

          // CASE_KIND:'案由', //TODO 暂时不传递 等待商量后的存放位置
          mainCaseReason: '1', // *主案由 是	单选
          mainCaseReasonLabel: '销售无标志的外国卷烟（国标）',
          secretaryCaseReason: ['1'], // *辅案由 是	复选
          secretaryCaseReasonLabels: ['销售无标志的外国卷烟（国标）'],

          ASSIST_UNIT: 'test协办单位', // *协办单位	是 input
          // 查获环节	是	下拉选择
          IS_MARKET: true,// 是否集贸市场	是	下拉选择	是or否
          MARKET_NAME: 'test集贸市场名称',// 集贸市场名称	是
          IS_TRANSPORT_CASE: true,// 是否为运输案件	是	下拉选择	是or否
          TRANSPORTTYPE: '01',// 运输方式 // 是	下发选择 运输方式	公路运输、铁路运输、航空运输、其他；
          TRANSPORT_CASE_PLACE: '01',// 运输案件案发地 // 是	下拉选择 运输案件案发地  	物流场站、道路途中；
          LICENSE_CODE: 'test许可证号'// 许可证号	是 input
        },

        fields: {
          CASE_ID: {
            type: 'input',
            modelKey: 'CASE_ID',
            label: '案发编号',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: true
            }
          },
          CASE_NAME: {
            type: 'input',
            modelKey: 'CASE_NAME',
            label: '案发名称',
            props: {
              placeholder: '请输入案发名称'
            },
            rules: {
              required: true
            }
          },
          CASE_GOODS_AMT: {
            type: 'input',
            modelKey: 'CASE_GOODS_AMT',
            label: '案值',
            props: {
              readonly: true,
              placeholder: '添加物品后自动计算!'
            },
            rules: {
              required: false
            }
          },
          CASE_DATE: {
            component: DataTimePickerComponent,
            // type: 'input',
            modelKey: 'CASE_DATE',
            label: '案发时间',
            rules: {
              required: true
            }
          },
          CASE_PLACE: {
            type: 'input',
            modelKey: 'CASE_PLACE',
            label: '案发地点',
            props: {
              placeholder: '请输入案发地点'
            },
            rules: {
              required: true
            }
          },
          GIS_LONGITUDE: {
            type: 'input',
            modelKey: 'GIS_LONGITUDE',
            label: '经度',
            props: {
              placeholder: '请输入经度'
            },
            rules: {
              required: true
            }
          },
          GIS_LATITUDES: {
            type: 'input',
            modelKey: 'GIS_LATITUDES',
            label: '纬度',
            props: {
              placeholder: '请输入纬度'
            },
            rules: {
              required: true
            }
          },
          EVIDENCE_TYPE: {
            type: 'checkbox-group',
            modelKey: 'EVIDENCE_TYPE',
            label: '证据类型', //复选
            props: {
              options: [],
            },
            rules: {
              required: true
            }
          },
          CASE_SOURCE: {
            type: 'select',
            modelKey: 'CASE_SOURCE',
            label: '案件来源',
            props: {
              options: []
            },
            rules: {
              required: true
            }
          },
          MANAGE_TYPE: {
            type: 'select',
            modelKey: 'MANAGE_TYPE',
            label: '案件类型',
            props: {
              options: []
            },
            rules: {
              required: true
            }
          },
          caseSourceLocation: {
            component: caseSourceLocationPicker,
            modelKey: 'caseSourceLocation',
            label: '案件来源地',
            rules: {
              required: true,
            }
          },
          caseGoesLocation: {
            component: caseGoesLocationPicker,
            // type: 'input',
            modelKey: 'caseGoesLocation',
            label: '案件去向地',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: true
            }
          },
          mainCaseReason: {
            type: 'select',
            modelKey: 'mainCaseReason',
            label: '主案由',
            props: {
              options: []
            },
            rules: {
              required: true
            }
          },
          secretaryCaseReason: { //9
            type: 'checkbox-group',
            modelKey: 'secretaryCaseReason',
            label: '辅案由', //复选
            props: {
              options: []
            },
            rules: {
              required: true
            }
          },
          ASSIST_UNIT: {
            type: 'input',
            modelKey: 'ASSIST_UNIT',
            label: '协办单位',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: true
            }
          },
          IS_MARKET: {
            type: 'switch',
            modelKey: 'IS_MARKET',
            label: '集贸市场',
            rules: {
              required: false
            }
          },
          // // 查获环节	是	下拉选择
          MARKET_NAME: {
            type: 'input',
            modelKey: 'MARKET_NAME',
            label: '集贸市场名',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: false
            }
          },
          IS_TRANSPORT_CASE: {
            type: 'switch',
            modelKey: 'IS_TRANSPORT_CASE',
            label: '运输案件',

            rules: {
              required: false
            }
          },
          TRANSPORTTYPE: {
            type: 'select',
            modelKey: 'TRANSPORTTYPE',
            label: '运输方式',
            props: {
              options: []
            },
            rules: {
              required: false
            }
          },
          TRANSPORT_CASE_PLACE: {
            type: 'select',
            modelKey: 'TRANSPORT_CASE_PLACE',
            label: '运输案件案发地',
            props: {
              options: []
            },
            rules: {
              required: true
            }
          },
          LICENSE_CODE: {
            type: 'input',
            modelKey: 'LICENSE_CODE',
            label: '许可证号',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: true
            }
          },
        } //end of fields

      } //end of return
    },
    methods: {
      // mainCaseReason: '1', // *主案由 是	单选
      // mainCaseReasonLabel : '',
      // secretaryCaseReason: [], // *辅案由 是	复选
      // secretaryCaseReasonLabels : [],

      mainCaseReasonChange(v) {
        this.formModel.mainCaseReason = v.value;
        this.formModel.mainCaseReasonLabel = v.label;
      },
      secretaryCaseReasonChange(v) {
        // console.log(v)
        this.formModel.secretaryCaseReason = v.values;
        this.formModel.secretaryCaseReasonLabels = v.labels;
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        // console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      submitHandler() {
        this.$refs.myForm.validate(valid => {
          if (valid) {
            this.$emit('submit', this.formModel)
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
      //
      // addPersomForm() {
      //   this.personFrom.push({});
      // },
      // removePersomForm() {
      //   if(this.personFrom.length !== 0) {
      //     this.personFrom.splice(this.personFrom.length-1, 1)
      //   }
      // }

    }


  }

</script>

<style>
  .cube-select {
    text-align: left;
  }

  .split-bar {
    background-color: #fa915a;
    height: 10px;
  }

  /*.cube-select > span  {*/
  /*position: relative;*/
  /*left: -53px;*/
  /*}*/
  /*.form-custom*/
  /*.cube-form-item*/
  /*.cube-btn*/
  /*padding-left: 0*/
  /*padding-right: 0*/
  /*text-align: left*/
  /*color: inherit*/
  /*background: none*/
  /*border: none*/
</style>
