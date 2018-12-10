<template>
  <div v-if="showSelfItemFrom" :style="{width: '100%', height: fullHeight + 'px' }">
    <!--<cube-form-item></cube-form-item>-->
    <div>
      <cube-scroll :style="{width: '100%', height: fullHeight + 'px' }">
      <!--<p>涉案物品</p>-->
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

<!--物品分类 是	下拉选择-->
<!--卷烟、雪茄烟、新型卷烟、烤烟、烟叶、复烤烟叶、再造烟叶、晾晒烟、烟丝、卷烟纸、烟用丝束、滤嘴棒、其他辅料、国产烟机、进口烟机、非法拼装烟机、新型烟草制品、假冒商标；-->
<!--*品牌规格	 是	下拉选择	参考《全国卷烟在销目录》，可通过关键字、条形码查找-->
<!--*数量	是-->
<!--单位	否		根据物品自动识别-->
<!--涉案价格	否		根据物品自动识别-->
<!--32位喷码	是		支持批量导入-->
<!--备注	是-->

<script>
  export default {
    name: "ItemForm",
    props: {
      title: String,
      visible: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      visible(val) {
        this.showSelfItemFrom = val
      }
    },
    data() {
      return {
        showSelfItemFrom: false,
        fullHeight: document.documentElement.clientHeight - 56,
        validity: {},
        valid: undefined,
        formModel: {
          itemType: '卷烟', //物品分类
          itemSpecification: '', //品牌规格
          amount: 0, //数量
          unit: '', //单位
          price: '', //涉案价格
          remarks: '', //备注
          // <!--物品分类 是	下拉选择-->
          // <!--卷烟、雪茄烟、新型卷烟、烤烟、烟叶、复烤烟叶、再造烟叶、晾晒烟、烟丝、卷烟纸、烟用丝束、滤嘴棒、其他辅料、国产烟机、进口烟机、非法拼装烟机、新型烟草制品、假冒商标；-->
          // <!--*品牌规格	 是	下拉选择	参考《全国卷烟在销目录》，可通过关键字、条形码查找-->
          // <!--*数量	是-->
          // <!--单位	否		根据物品自动识别-->
          // <!--涉案价格	否		根据物品自动识别-->
          // <!--32位喷码	是		支持批量导入-->
          // <!--备注	是-->
        },
        schema: {
          groups: [
            {
              legend: this.title,
              fields: [
                {
                  type: 'select',
                  modelKey: 'itemType',
                  label: '物品分类',
                  props: {
                    options: ['卷烟',
                      '雪茄烟',
                      '新型卷烟',
                      '烤烟',
                      '烟叶',
                      '复烤烟叶',
                      '再造烟叶',
                      '晾晒烟',
                      '烟丝',
                      '卷烟纸',
                      '烟用丝束',
                      '滤嘴棒',
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
                  type: 'input',
                  modelKey: 'itemSpecification',
                  label: '品牌规格',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                },
                {
                  type: 'input',
                  modelKey: 'amount',
                  label: '数量',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                },
                {
                  type: 'input',
                  modelKey: 'unit',
                  label: '单位',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                },
                {
                  type: 'input',
                  modelKey: 'price',
                  label: '价格',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                },        {
                  type: 'input',
                  modelKey: 'remarks',
                  label: '备注',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                },

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
        // this.$emit('submit', this.formModel)
        // this.$emit('update:visible', false)
        // console.log('submit', e)
        this.$refs.myForm.validate(valid => {
          if (valid) {
            // console.log(this.formModel);
            this.$emit('submit', this.formModel)
            this.$emit('update:visible', false)
          }
        });
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
