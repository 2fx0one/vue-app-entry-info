<template>
  <!--<div :style="{width: '100%', height: fullHeight + 'px' }">-->
  <div>
    <!--<cube-button :primary="true">Button</cube-button>-->
    <!--<cube-button :primary="true">Button</cube-button>-->
    <base-form></base-form>
  </div>
</template>

<script>
  import BaseForm from "../infoForm/BaseForm";
  export default {
    name: "MainPageForm",
    components: {BaseForm},
    data() {
      return {
        fullHeight: document.documentElement.clientHeight - 56,
      }
    }
  }
</script>

<style scoped>
  .infoFromButton {
    margin-top: 100px;
  }

</style>
