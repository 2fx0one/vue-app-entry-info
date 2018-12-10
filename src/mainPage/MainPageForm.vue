<template>
  <!--<div :style="{width: '100%', height: fullHeight + 'px' }">-->
  <div>
    <!--<cube-button :primary="true">Button</cube-button>-->
    <!--<cube-button :primary="true">Button</cube-button>-->
    <base-form :visible.sync="showBaseForm" @submit="baseSubmit"></base-form>
    <person-form  :visible.sync="ShowPersonFrom" @submit="personSubmit"></person-form>
    <item-form  :visible.sync="ShowItemFrom" @submit="itemSubmit"></item-form>
  </div>
</template>

<script>
  import BaseForm from "../infoForm/BaseForm";
  import PersonForm from "../infoForm/PersonForm";
  import ItemForm from "../infoForm/ItemForm";

  export default {
    name: "MainPageForm",
    components: {ItemForm, PersonForm, BaseForm},
    data() {
      return {
        showBaseForm: true,
        baseFormData: {},
        ShowPersonFrom: false,
        PersonFromData: {},
        ShowItemFrom: false,
        itemFromData: {},
        fullHeight: document.documentElement.clientHeight - 56,
      }
    },
    methods: {
      baseSubmit(val) {
        this.baseFormData = val
        console.log(this.baseFormData)
        this.ShowPersonFrom = true
      },
      personSubmit(val) {
        this.PersonFromData = val
        console.log(this.PersonFromData)
        this.ShowItemFrom = true;
      },
      itemSubmit(val) {
        this.itemFromData = val
        console.log(this.itemFromData)
        this.$emit('submit', {
          base: this.baseFormData,
          person: this.showSelfPersonFrom,
          item: this.itemFromData
        })

      }

    }
  }
</script>

<style scoped>
  .infoFromButton {
    margin-top: 100px;
  }

</style>
