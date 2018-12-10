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
      :options="fields[8].props.options"
      @change="mainCaseReasonChange"
      :height="fullHeight">
    </pop-radio-group>

    <!--辅案由弹窗-->
    <pop-check-box-group
      :title="'辅案由'"
      :visible.sync="popSecretaryCaseReasonShow"
      :currentSelect="formModel.secretaryCaseReason"
      :options="fields[9].props.options"
      @change="secretaryCaseReasonChange"
      :height="fullHeight">
    </pop-check-box-group>


    <div >
      <cube-scroll :style="{width: '100%', height: fullHeight + 'px' }">
        <!--<cube-form ref="myForm" :model="formModel" @validate="validateHandler" @submit="submitHandler">-->
        <cube-form ref="myForm" :model="formModel" @validate="validateHandler">
            <!--<p>{{title}}</p>-->
          <cube-form-group :legend="title">
            <cube-form-item :field="fields[0]">
              <cube-button @click="showDateTimePicker" :light="true">{{formModel.caseDatetime || ' 点击选择案发时间'}}
              </cube-button>
            </cube-form-item>
            <cube-form-item :field="fields[1]"></cube-form-item>
            <cube-form-item :field="fields[2]"></cube-form-item>
            <cube-form-item :field="fields[3]"></cube-form-item>
            <cube-form-item :field="fields[4]"></cube-form-item>
            <cube-form-item :field="fields[5]"></cube-form-item>
            <cube-form-item :field="fields[6]"></cube-form-item>
            <cube-form-item :field="fields[7]"></cube-form-item>

            <!--主案由-->
            <cube-form-item :field="fields[8]">
              <p style="font-size:16px; text-align: left"
                 @click="popMainCaseReasonShow = true" :light="true">{{formModel.mainCaseReasonLabel || ' 点击选择主案由'}}
              </p>
              <!--<cube-button @click="showPopup('myPopup')" :light="true">{{formModel.caseDatetime || ' 点击选择主案由'}}-->
              <!--</cube-button>-->
            </cube-form-item>

            <!--辅案由-->
            <cube-form-item :field="fields[9]">
              <p style="font-size:14px; text-align: left"
                 v-for="(reason, key) in formModel.secretaryCaseReasonLabels"
                 :key="reason.id"
                 @click="popSecretaryCaseReasonShow = true" :light="true">{{key+1 + " : " + reason || ' 点击选择辅案由'}}
              </p>
            </cube-form-item>
            <!--<cube-form-item :field="fields[8]"></cube-form-item>-->
            <!--<cube-form-item :field="fields[9]"></cube-form-item>-->

            <cube-form-item :field="fields[10]"></cube-form-item>

            <!-- isMarket -->
            <cube-form-item :field="fields[11]"></cube-form-item>
            <cube-form-item v-if="formModel.isMarket" :field="fields[12]"></cube-form-item>

            <!--istTransport-->
            <cube-form-item :field="fields[13]"></cube-form-item>
            <cube-form-item v-if="formModel.istTransport" :field="fields[14]"></cube-form-item>
            <cube-form-item v-if="formModel.istTransport" :field="fields[15]"></cube-form-item>

            <!--许可号-->
            <cube-form-item :field="fields[16]"></cube-form-item>
          </cube-form-group>

          <!--<p class="split-bar" v-if="personFrom.length !== 0">&nbsp</p>-->
          <!--<cube-form-group :legend="''">-->
            <!--<person-form v-for="(item, key) in personFrom" :key="item.id" :title="'涉案人员'+(key+1)"></person-form>-->
            <!--&lt;!&ndash;<cube-button @click="addPersomForm" :inline="true">添加涉案人员</cube-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<cube-button @click="removePersomForm" :inline="true" :primary="true">删除涉案人员</cube-button>&ndash;&gt;-->
          <!--</cube-form-group>-->

          <!--<cube-form-group :legend="'====='">-->
            <cube-button @click="submitHandler">下一步</cube-button>
            <!--<cube-button :primary="true">重置</cube-button>-->
          <!--</cube-form-group>-->

        </cube-form>
      </cube-scroll>
    </div>


  </div>
</template>

<script>
  import PopCheckBoxGroup from "../components/PopCheckBoxGroup";
  import PopRadioGroup from "../components/PopRadioGroup";
  import mainCaseReasonOption from "./formData"
  // import PersonForm from "./PersonForm";

  export default {
    name: "BaseForm",
    components: { PopRadioGroup, PopCheckBoxGroup},
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: true
      },
    },
    watch: {
      visible(val) {
        this.showSelfBaseForm = val
      }
    },
    data() {
      // sessionStorageFormDate = JSON.parse(sessionStorage.getItem(''));
      return {
        showSelfBaseForm: true,
        popMainCaseReasonShow: false, //主案由弹窗
        popSecretaryCaseReasonShow: false, //辅助按钮弹窗

        fullHeight: document.documentElement.clientHeight - 56,

        formModel: {
          caseDatetime: '', //案发时间
          caseLocation: '', //案发地点
          longitude: JSON.parse(sessionStorage.getItem('location'))['lng'],//store.state.location['lng'], // 经度
          latitude: JSON.parse(sessionStorage.getItem('location'))['lat'], //store.state.location['lat'], // 纬度
          evidenceType: ['1'], //证据类型 	复选 书证、物证、鉴定结论、勘验笔录、询问笔录、证人证言、视听资料、其他；
          caseSource: '投诉举报',// 案件来源	  投诉举报、市场查获、案件移交、指定管辖、上级交办、其他；
          caseSourceLocation: '',// 案件来源指向地	是		省市区（县），参考字典
          caseGoesLocation: '',// 案件去向指向地	是 省市区（县），参考字典

          mainCaseReason: '1', // *主案由 是	单选
          mainCaseReasonLabel : '销售无标志的外国卷烟（国标）',
          secretaryCaseReason: ['1'], // *辅案由 是	复选
          secretaryCaseReasonLabels : ['销售无标志的外国卷烟（国标）'],

          coOrganiser: '', // *协办单位	是 input
          // 查获环节	是	下拉选择
          isMarket: true,// 是否集贸市场	是	下拉选择	是or否
          marketName: '集贸市场名称',// 集贸市场名称	是
          istTransport: true,// 是否为运输案件	是	下拉选择	是or否
          transport: '公路运输',// 运输方式 // 是	下发选择 运输方式	公路运输、铁路运输、航空运输、其他；
          transportCaseLocation: '物流场站',// 运输案件案发地 // 是	下拉选择 运输案件案发地  	物流场站、道路途中；
          PermitNumber: ''// 许可证号	是 input
        },

        fields: [
          {
            type: 'input',
            modelKey: 'caseDatetime',
            label: '案发时间',
            props: {
              placeholder: '请点击'
            },
            rules: {
              required: false
            }
          },
          {
            type: 'input',
            modelKey: 'caseLocation',
            label: '案发地点',
            props: {
              placeholder: '请输入案发地点'
            },
            rules: {
              required: false
            }
          },
          {
            type: 'input',
            modelKey: 'longitude',
            label: '经度',
            props: {
              placeholder: '请输入经度'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'latitude',
            label: '纬度',
            props: {
              placeholder: '请输入纬度'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'checkbox-group',
            modelKey: 'evidenceType',
            label: '证据类型', //复选
            props: {
              options: [
                {
                  label: '书证',
                  value: '1'
                }
                , '物证', '鉴定结论', '勘验笔录', '询问笔录', '证人证言', '视听资料', '其它']
            },
            rules: {
              required: true
            }
          },
          {
            type: 'select',
            modelKey: 'caseSource',
            label: '案件来源',
            props: {
              options: ['投诉举报', '市场查获', '案件移交', '指定管辖', '上级交办', '其它']
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'caseSourceLocation',
            label: '案件来源地',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: false
            }
          },
          {
            type: 'input',
            modelKey: 'caseGoesLocation',
            label: '案件去向地',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: false
            }
          },
          { //8
            type: 'select',
            modelKey: 'mainCaseReason',
            label: '主案由',
            props: {
              options: mainCaseReasonOption
            },
            rules: {
              required: true
            }
          },
          { //9
            type: 'checkbox-group',
            modelKey: 'secretaryCaseReason',
            label: '辅案由', //复选
            props: {
              options: mainCaseReasonOption
            },
            rules: {
              required: true
            }
          },
          { //[10]
            type: 'input',
            modelKey: 'coOrganiser',
            label: '协办单位',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: false
            }
          },
          { //[11]
            type: 'switch',
            modelKey: 'isMarket',
            label: '集贸市场',
            rules: {
              required: false
            }
          },
          // // 查获环节	是	下拉选择
          {
            //[12]
            type: 'input',
            modelKey: 'marketName',
            label: '集贸市场名',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: false
            }
          },
          {
            type: 'switch',
            modelKey: 'istTransport',
            label: '运输案件',

            rules: {
              required: false
            }
          },
          {
            type: 'select',
            modelKey: 'transport',
            label: '运输方式',
            props: {
              options: ['公路运输', '铁路运输', '航空运输', '其它']
            },
            rules: {
              required: true
            }
          },
          {
            type: 'select',
            modelKey: 'transportCaseLocation',
            label: '运输案件案发地',
            props: {
              options: ['物流场站', '道路途中']
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'PermitNumber',
            label: '许可证号',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: false
            }
          },
        ]

      }
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
        // console.log("submit");
        this.$refs.myForm.validate(valid => {
          if (valid) {
            // console.log(this.formModel);
            this.$emit('submit', this.formModel)
            this.$emit('update:visible', false)
          }
        });
        // console.log(this.$ref['formBase']);
        // this.$refs['formBase'].validateHandler()

      },
      showDateTimePicker() {
        if (!this.dateTimePicker) {
          this.dateTimePicker = this.$createDatePicker({
            title: '选择案发时间',
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2199, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle,
            format: {
              year: 'YY年',
              month: 'MM月',
              date: 'D日',
              hour: 'hh时', minute: 'mm分', second: 'ss秒'
            },
          })
        }

        this.dateTimePicker.show()
      },
      selectHandle(date, selectedVal, selectedText) {
        // console.log(selectedVal);
        // console.log(selectedText);
        this.formModel.caseDatetime = `${selectedText.join('')}`
        // this.formModel.caseDatetime = `${selectedText[0]}年${selectedText[1]}月${selectedText[2]}日${selectedText[3]}时${selectedText[4]}分${selectedText[5]}秒`;
        // this.$createDialog({
        //   type: 'warn',
        //   content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        //   icon: 'cubeic-alert'
        // }).show()
      },
      cancelHandle() {
        // this.store.dispatch('increment', 1)
        // this.$createToast({
        //   type: 'correct',
        //   txt: 'Picker canceled',
        //   time: 1000
        // }).show()
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
