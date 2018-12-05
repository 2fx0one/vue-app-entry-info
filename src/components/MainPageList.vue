<template>
  <div :style="{width: '100%', height: fullHeight + 'px' }">

  </div>
</template>

<script>
  export default {
    name: "MainPageList",
    data() {
      return {
        fullHeight: document.documentElement.clientHeight - 56,
      }
    }

  }
</script>

<style scoped>

</style>
