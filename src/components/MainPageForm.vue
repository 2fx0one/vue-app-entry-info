<template>
    <div :style="{width: '100%', height: fullHeight + 'px' }">
      <div>
        <cube-radio-group v-model="currentRadioSelect" :options="options" :horizontal="true"/>
        <!--<cube-checkbox-group-->
        <!--v-model="checkList"-->
        <!--:options="options"-->
        <!--:horizontal="true"-->
        <!--shape="square"-->
        <!--:hollow-style="true"-->
        <!--@click="clickCheckBox">-->
        <!--</cube-checkbox-group>-->
      </div>

      <div slot="content" :style="{width: '100%', height: fullHeight-50 + 'px' }">
        <cube-scroll>
          <cube-form :model="formModel" @validate="validateHandler" @submit="submitHandler">
            <cube-form-group :legend="'基本信息'">
              <cube-form-item :field="fields[0]">
                <cube-button @click="showDateTimePicker" :light="true">{{formModel.caseDatetime || ' 点击选择案发时间'}}
                </cube-button>
                <!--<cube-input @click="showDateTimePicker" v-model="formModel.datatimeValue" ></cube-input>-->
              </cube-form-item>
              <cube-form-item :field="fields[1]"></cube-form-item>
              <cube-form-item :field="fields[2]"></cube-form-item>
              <cube-form-item :field="fields[3]"></cube-form-item>
              <cube-form-item :field="fields[4]"></cube-form-item>
              <cube-form-item :field="fields[5]"></cube-form-item>
              <cube-form-item :field="fields[6]"></cube-form-item>
              <cube-form-item :field="fields[7]"></cube-form-item>
              <cube-form-item :field="fields[8]"></cube-form-item>
              <cube-form-item :field="fields[9]"></cube-form-item>
              <!-- isMarket -->
              <cube-form-item :field="fields[10]"></cube-form-item> 

              <cube-form-item v-if="formModel.isMarket" :field="fields[11]"></cube-form-item>
              <cube-form-item :field="fields[12]"></cube-form-item>
              <cube-form-item v-if="formModel.istTransport" :field="fields[13]"></cube-form-item>
              <cube-form-item v-if="formModel.istTransport" :field="fields[14]"></cube-form-item>
              <cube-form-item :field="fields[15]"></cube-form-item>
            </cube-form-group>

            <cube-form-group>
              <cube-button type="submit">Submit</cube-button>
            </cube-form-group>
          </cube-form>
        </cube-scroll>
      </div>


    </div>
</template>

<script>
  export default {
    name: "MainPageForm",
    // created() {
    //   console.log("init");
    //   this.$barcodeScanner.init(this.onBarcodeScanned)
    // },
    // destroyed () {
    //   // Remove listener when component is destroyed
    //   this.$barcodeScanner.destroy()
    // },
    data() {
      return {
        fullHeight: document.documentElement.clientHeight - 56,
        currentRadioSelect: '2',
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
        formModel: {
          caseDatetime: '', //案发时间
          caseLocation: '', //案发地点
          longitude: '', // 经度
          latitude: '', // 纬度
          evidenceType: ['书证'], //证据类型 	复选 书证、物证、鉴定结论、勘验笔录、询问笔录、证人证言、视听资料、其他；
          caseSource: '投诉举报',// 案件来源	  投诉举报、市场查获、案件移交、指定管辖、上级交办、其他；
          caseSourceLocation: '',// 案件来源指向地	是		省市区（县），参考字典
          caseGoesLocation: '',// 案件去向指向地	是 省市区（县），参考字典
          caseReason: '销售无标志的外国卷烟（国标）', // *案由 是	复选
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
            event: {
              'click': (arg) => {
                console.log(arg);
              }
            },
            props: {
              placeholder: '请点击'
            },
            rules: {
              required: true
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
              required: true
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
              options: ['书证', '物证', '鉴定结论', '勘验笔录', '询问笔录', '证人证言', '视听资料', '其它']
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
              required: true
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
              required: true
            }
          },
          {
            type: 'select',
            modelKey: 'caseReason',
            label: '案由',
            props: {
              options: ['销售无标志的外国卷烟（国标）', '市场查获', '案件移交', '指定管辖', '上级交办', '其它']
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'coOrganiser',
            label: '协办单位',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: true
            }
          },
          { //[10]
            type: 'switch',
            modelKey: 'isMarket',
            label: '集贸市场',
            rules: {
              required: false
            }
          },
          // // 查获环节	是	下拉选择
          {
            //[11]
            type: 'input',
            modelKey: 'marketName',
            label: '集贸市场名',
            props: {
              placeholder: '请输入',
            },
            rules: {
              required: true
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
              required: true
            }
          },
        ]

      }
    },
    methods: {
      validateHandler() {

      },
      submitHandler() {

      },
      showDateTimePicker() {
        if (!this.dateTimePicker) {
          this.dateTimePicker = this.$createDatePicker({
            title: 'Date Time Picker',
            min: new Date(2008, 7, 8, 8, 0, 0),
            min: new Date(2008, 8, 8, 8, 0, 0),
            min: new Date(2008, 9, 8, 8, 0, 0),
            min: new Date(2008, 10, 8, 8, 0, 0),
            max: new Date(2199, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }

        this.dateTimePicker.show()
      },
      selectHandle(date, selectedVal, selectedText) {
        // console.log(selectedVal);
        // console.log(selectedText);
        this.formModel.caseDatetime = `${selectedText[0]}年${selectedText[1]}月${selectedText[2]}日${selectedText[3]}时${selectedText[4]}分${selectedText[5]}秒`;
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      cancelHandle() {
        // this.$createToast({
        //   type: 'correct',
        //   txt: 'Picker canceled',
        //   time: 1000
        // }).show()
      }

    }


  }

</script>

<style>
  .cube-select {
    text-align: left;
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
