<template>
  <!--<div :style="{width: '100%', height: fullHeight + 'px' }">-->
  <div>
    <!--<cube-button :primary="true">Button</cube-button>-->
    <!--<cube-button :primary="true">Button</cube-button>-->
    <base-form :visible.sync="showBaseForm" :title="'基本信息'" @submit="baseSubmit"></base-form>
    <person-form  :visible.sync="ShowPersonFrom" :title="'涉案人员信息'" @submit="personSubmit"></person-form>
    <item-form  :visible.sync="ShowItemFrom" :title="'涉案物品信息'" @submit="itemSubmit"></item-form>
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
        PersonFromData: [],
        ShowItemFrom: false,
        itemFromData: [],
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
          persons: this.showSelfPersonFrom,
          items: this.itemFromData
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
