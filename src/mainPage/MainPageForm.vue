<template>
  <!--<div :style="{width: '100%', height: fullHeight + 'px' }">-->
  <div>
    <!--<cube-button :primary="true">Button</cube-button>-->
    <!--<cube-button :primary="true">Button</cube-button>-->
    <base-form v-if="forms.base.show" :title="'基本信息'" @submit="baseSubmit"></base-form>
    <person-form v-if="forms.person.show" :title="'涉案人员信息'" @submit="personSubmit"></person-form>
    <item-form v-if="forms.item.show" :title="'涉案物品信息'" @submit="itemSubmit"></item-form>
    <vehicle-form v-if="forms.vehicle.show" :title="'涉案车辆信息'" @submit="vehicleSubmit"></vehicle-form>
    <place-form v-if="forms.place.show" :title="'涉案地点信息'" @submit="placeSubmit"></place-form>
  </div>
</template>

<script>
  import BaseForm from "../infoForm/BaseForm";
  import PersonForm from "../infoForm/PersonForm";
  import ItemForm from "../infoForm/ItemForm";
  import VehicleForm from "@/infoForm/VehicleForm";
  import PlaceForm from "@/infoForm/PlaceForm";
  import {submitCase} from "@/api/case";

  export default {
    name: "MainPageForm",
    components: {PlaceForm, VehicleForm, ItemForm, PersonForm, BaseForm},
    data() {
      return {
        forms: {
          base: {
            show: true,
            data: {},
          },
          person: {
            show: false,
            data: [],
          },
          item: {
            show: false,
            data: [],
          },
          vehicle: {
            show: false,
            data: {},
          },
          place: {
            show: false,
            data: {},
          }
        },

        fullHeight: document.documentElement.clientHeight - 56,
      }
    },
    methods: {
      formSwitchTo(formName) {

        for (let f in this.forms) {
          // console.log(this.forms[f])
          this.forms[f].show = f === formName
        }
      },
      baseSubmit(val) {
        console.log(val)
        this.forms.base.data = val
        this.formSwitchTo('person')
      },
      personSubmit(val) {
        console.log(val)
        this.forms.person.data = val
        this.formSwitchTo('item')
      },
      itemSubmit(val) {
        console.log(val)
        this.forms.item.data = val
        this.formSwitchTo('vehicle')
      },

      vehicleSubmit(val) {
        console.log(val)
        this.forms.vehicle.data = val
        this.formSwitchTo('place')
      },

      placeSubmit(val) {

        console.log(val)
        this.forms.place.data = val

        //基础表单
        this.forms.base.data.id='0092233704939154463868777170000'
        this.forms.base.data.cmd='add'

        this.forms.base.data.refDataJson = {
          //人员列表
          '009223370493916329954302710000': {
            'data': this.forms.person.data
          },
          //物品
          '0092233704939162162093249870000': {
            'data': this.forms.item.data
          },
          //车辆
          '0092233704939136009528049160000': {
            'data': this.forms.vehicle.data
          },
          //地点
          '0092233704939158976384809400000': {
            'data': this.forms.place.data
          },
        }

        console.log(this.forms.base.data)

        submitCase(this.forms.base.data).then(response => {
          console.log(response)
        })
        // this.$emit('submit', {
        //   base: this.baseFormData,
        //   persons: this.showSelfPersonFrom,
        //   items: this.itemFromData
        // })
      }
    }
  }
</script>

<style scoped>
  .infoFromButton {
    margin-top: 100px;
  }

</style>
