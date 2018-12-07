<template>
  <div :style="{width: '100%', height: fullHeight + 'px' }">
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


    <div :style="{width: '100%', height: fullHeight + 'px' }">
      <cube-scroll>
        <!--<cube-form ref="myForm" :model="formModel" @validate="validateHandler" @submit="submitHandler">-->
        <cube-form ref="myForm" :model="formModel" @validate="validateHandler">
          <cube-form-group :legend="'基本信息'">
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
                 @click="popMainCaseReasonShow = true" :light="true">{{formModel.mainCaseReason || ' 点击选择辅案由'}}
              </p>
              <!--<cube-button @click="showPopup('myPopup')" :light="true">{{formModel.caseDatetime || ' 点击选择主案由'}}-->
              <!--</cube-button>-->
            </cube-form-item>

            <!--辅案由-->
            <cube-form-item :field="fields[9]">
              <p style="font-size:14px; text-align: left"
                 v-for="(reason, key) in formModel.secretaryCaseReason"
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
          <!--<cube-form-group>-->
          <!--<cube-button type="submit">Submit</cube-button>-->
          <!--</cube-form-group>-->
          <cube-form-group>
            <cube-button @click="submitHandler">提交</cube-button>

            <!--<cube-button :primary="true">重置</cube-button>-->
          </cube-form-group>
        </cube-form>
      </cube-scroll>
    </div>


  </div>
</template>

<script>
  import PopCheckBoxGroup from "../components/PopCheckBoxGroup";
  import PopRadioGroup from "../components/PopRadioGroup";

  export default {
    name: "BaseForm",
    components: {PopRadioGroup, PopCheckBoxGroup},
    data() {
      // sessionStorageFormDate = JSON.parse(sessionStorage.getItem(''));
      return {
        popMainCaseReasonShow: false, //主案由弹窗
        popSecretaryCaseReasonShow: false, //辅助按钮弹窗

        popupVisible: false,
        fullHeight: document.documentElement.clientHeight - 56,
        currentRadioSelect: '2',
        options: [
          {
            label: '案件',
            value: '2',
          },
          {
            label: '情报',
            value: '3',
          },
        ],

        formModel: {
          caseDatetime: '', //案发时间
          caseLocation: '', //案发地点
          longitude: JSON.parse(sessionStorage.getItem('location'))['lng'],//store.state.location['lng'], // 经度
          latitude: JSON.parse(sessionStorage.getItem('location'))['lat'], //store.state.location['lat'], // 纬度
          evidenceType: ['2'], //证据类型 	复选 书证、物证、鉴定结论、勘验笔录、询问笔录、证人证言、视听资料、其他；
          caseSource: '投诉举报',// 案件来源	  投诉举报、市场查获、案件移交、指定管辖、上级交办、其他；
          caseSourceLocation: '',// 案件来源指向地	是		省市区（县），参考字典
          caseGoesLocation: '',// 案件去向指向地	是 省市区（县），参考字典
          mainCaseReason: '销售无标志的外国卷烟（国标）', // *主案由 是	单选
          secretaryCaseReason: ['销售无标志的外国卷烟（国标）'], // *辅案由 是	复选
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
                  value: '2'
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
          { //8
            type: 'select',
            modelKey: 'mainCaseReason',
            label: '主案由',
            props: {
              options: ['销售无标志的外国卷烟（国标）',
                '销售无标志的外国卷烟、专供出口卷烟、没收的非法进口卷烟（省标）',
                '未在当地烟草专卖批发企业进货（国标）',
                '未在当地烟草专卖批发企业进货（省条例）（省标）',
                '无证经营烟草制品零售业务（国标）',
                '无烟草专卖零售许可证经营烟草制品零售业务（省标）',
                '使用过期、失效许可证或转让许可证（国标）',
                '使用涂改、伪造、变造的烟草专卖许可证（省标）',
                '不及时办理许可证年检、变更、注销手续（国标）',
                '不及时办理烟草专卖许可证变更、注销手续（省标）',
                '其他（国标）',
                '未亮证经营烟草制品（省标）',
                '以营利为目的、非法互相购销烟草制品（进货方）（省标）',
                '以盈利为目的、非法互相购销烟草制品（销售方）（省标）',
                '非法储存、投递、运输走私烟草制品（省标）',
                '销售走私卷烟（省标）',
                '运输、存储、投递假冒、无商标以及霉坏变质的烟草制品（省标）',
                '生产销售假冒商标、无商标、霉变烟草制品（省标）',
                '为生产、销售走私、假冒商标卷烟等违法行为提供条件（省标）',
                '非法收购卷烟、雪茄烟（省标）',
                '非法印刷、销售、使用烟草专卖标识（省标）',
                '无烟草专卖品准运证运输烟草专卖品（超量邮寄、携带）（国标）',
                '邮寄、异地携带烟草、烟草制品超过有关规定（省标）',
                '超越许可证规定范围从事烟草制品批发业务（有批发企业许可证）（国标）',
                '超越烟草专卖批发企业许可证规定范围从事烟草制品批发业务（省标）',
                '销售出口倒流国产卷烟（国标）',
                '无烟草专卖品准运证运输烟草专卖品（国标）',
                '无烟草专卖品准运证运输烟草专卖品（情节较重）（国标）',
                '承运无烟草专卖品准运证运输的烟草专卖品（国标）',
                '无证生产烟草制品（国标）',
                '无证生产卷烟纸、滤嘴棒、烟用丝束、烟草专用机械（国标）',
                '无证批发烟草制品（国标）',
                '无证经营烟叶、卷烟纸、滤嘴棒、烟用丝束和烟草专卖机械（国标）',
                '无证经营烟草专卖品进出口业务（国标）',
                '无证经营外国烟草制品购销业务（国标）',
                '擅自跨省经营烟草专卖品批发业务（国标）',
                '为无烟草专卖许可证的单位或者个人提供烟草专卖品（国标）',
                '销售非法生产的烟草专卖品（国标）',
                '不按规定存放免税烟草制品（国标）',
                '免税店经营未加贴专门标志的卷烟、雪茄烟（国标）',
                '销售霉变卷烟（国标）',
                '非法取得烟草专卖品准运证（国标）',
                '从无证企业购买卷烟纸、滤嘴棒、烟用丝束、烟草专用机械（国标）',
                '擅自拍卖烟草专卖品（国标）',
                '向无烟草专卖生产企业许可证的单位或者个人销售卷烟纸、滤嘴棒、烟用丝束、烟草专用机械（国标）',
                '擅自收购烟草（国标）',
                '销售没收的非法进口卷烟（国标）'
              ]
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
              options: ['销售无标志的外国卷烟（国标）',
                '销售无标志的外国卷烟、专供出口卷烟、没收的非法进口卷烟（省标）',
                '未在当地烟草专卖批发企业进货（国标）',
                '未在当地烟草专卖批发企业进货（省条例）（省标）',
                '无证经营烟草制品零售业务（国标）',
                '无烟草专卖零售许可证经营烟草制品零售业务（省标）',
                '使用过期、失效许可证或转让许可证（国标）',
                '使用涂改、伪造、变造的烟草专卖许可证（省标）',
                '不及时办理许可证年检、变更、注销手续（国标）',
                '不及时办理烟草专卖许可证变更、注销手续（省标）',
                '其他（国标）',
                '未亮证经营烟草制品（省标）',
                '以营利为目的、非法互相购销烟草制品（进货方）（省标）',
                '以盈利为目的、非法互相购销烟草制品（销售方）（省标）',
                '非法储存、投递、运输走私烟草制品（省标）',
                '销售走私卷烟（省标）',
                '运输、存储、投递假冒、无商标以及霉坏变质的烟草制品（省标）',
                '生产销售假冒商标、无商标、霉变烟草制品（省标）',
                '为生产、销售走私、假冒商标卷烟等违法行为提供条件（省标）',
                '非法收购卷烟、雪茄烟（省标）',
                '非法印刷、销售、使用烟草专卖标识（省标）',
                '无烟草专卖品准运证运输烟草专卖品（超量邮寄、携带）（国标）',
                '邮寄、异地携带烟草、烟草制品超过有关规定（省标）',
                '超越许可证规定范围从事烟草制品批发业务（有批发企业许可证）（国标）',
                '超越烟草专卖批发企业许可证规定范围从事烟草制品批发业务（省标）',
                '销售出口倒流国产卷烟（国标）',
                '无烟草专卖品准运证运输烟草专卖品（国标）',
                '无烟草专卖品准运证运输烟草专卖品（情节较重）（国标）',
                '承运无烟草专卖品准运证运输的烟草专卖品（国标）',
                '无证生产烟草制品（国标）',
                '无证生产卷烟纸、滤嘴棒、烟用丝束、烟草专用机械（国标）',
                '无证批发烟草制品（国标）',
                '无证经营烟叶、卷烟纸、滤嘴棒、烟用丝束和烟草专卖机械（国标）',
                '无证经营烟草专卖品进出口业务（国标）',
                '无证经营外国烟草制品购销业务（国标）',
                '擅自跨省经营烟草专卖品批发业务（国标）',
                '为无烟草专卖许可证的单位或者个人提供烟草专卖品（国标）',
                '销售非法生产的烟草专卖品（国标）',
                '不按规定存放免税烟草制品（国标）',
                '免税店经营未加贴专门标志的卷烟、雪茄烟（国标）',
                '销售霉变卷烟（国标）',
                '非法取得烟草专卖品准运证（国标）',
                '从无证企业购买卷烟纸、滤嘴棒、烟用丝束、烟草专用机械（国标）',
                '擅自拍卖烟草专卖品（国标）',
                '向无烟草专卖生产企业许可证的单位或者个人销售卷烟纸、滤嘴棒、烟用丝束、烟草专用机械（国标）',
                '擅自收购烟草（国标）',
                '销售没收的非法进口卷烟（国标）'
              ]
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
              required: true
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
      mainCaseReasonChange(val) {
        this.formModel.mainCaseReason = val;
      },
      secretaryCaseReasonChange(val) {
        this.formModel.secretaryCaseReason = val;
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        // console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      submitHandler() {
        console.log("submit");
        this.$refs.myForm.validate(valid => {
          if (valid) {
            console.log(this.formModel);
          }
        });
        // console.log(this.$ref['formBase']);
        // this.$refs['formBase'].validateHandler()
        return

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
