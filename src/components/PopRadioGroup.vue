<template>
  <div v-if="popShow">
    <cube-button :primary="true" @click="close">选择{{title}}完成!</cube-button>

    <div>
      <div>
        <cube-scroll :style="{width: '100%', height: height + 10 + 'px' }">
          <cube-radio-group v-model="selected" :options="options"></cube-radio-group>
        </cube-scroll>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "PopRadioGroup",
    data() {
      return {
        popShow: false,
        selected: '',
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
      currentSelect: String,
      options: Array,
    },
    watch: {
      visible(val) {
        this.popShow = val
      },
      currentSelect(val) {
        this.selected = val
      },
      selected(val) {
        this.$emit('change', val)
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
