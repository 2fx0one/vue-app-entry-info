<template>
  <div v-if="popShow">
    <cube-button :primary="true" @click="close">{{title}}选择完成!</cube-button>

    <div>
      <div>
        <cube-scroll :style="{width: '100%', height: height + 10 + 'px' }">
          <cube-checkbox-group v-model="myModel" :options="options" shape="square" :hollow-style="true"></cube-checkbox-group>
        </cube-scroll>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "PopCheckBoxGroup",
    data() {
      return {
        popShow: false,
        myModel: [],
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: 300
      },
      title: String,
      currentSelect: Array,
      options: Array,
    },
    watch: {
      visible(val) {
        this.popShow = val
      },
      currentSelect(val) {
        this.myModel = val
      },
      myModel(values) {
        // console.log(typeof this.options)
        let labels = this.options.filter(v => values.indexOf(v.value) !== -1).map(v => v.label)
        this.$emit('change', {
          values,
          labels
        })
      }
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      }

    }
  }
</script>

<style scoped>

</style>
