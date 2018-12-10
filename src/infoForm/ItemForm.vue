<template>
  <div v-if="showSelfItemFrom" :style="{width: '100%', height: fullHeight + 'px' }">
    <!--<cube-form-item></cube-form-item>-->
    <p>涉案人员</p>
    <div>
      <cube-scroll :style="{width: '100%', height: fullHeight + 'px' }">
        <cube-form
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
        showSelfItemFrom: false
      }
    }
  }
</script>

<style scoped>

</style>
