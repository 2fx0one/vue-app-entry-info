import { provinceList, cityList, areaList } from "@/infoForm/area"

const cityData = provinceList
cityData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})
//省市县选择
const PCAComponent = {
  name: 'PCAComponent',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selected: []
    }
  },
  render(createElement) {
    return createElement('cube-button', {
      props: {
        light: true
      },
      on: {
        click: this.showPicker
      }
    }, this.selected.length ? this.selected.join(' ') : '点击选择区域')
  },
  mounted() {
    this.picker = this.$createCascadePicker({
      title: '籍贯选择',
      data: cityData,
      selectedIndex: this.value,
      onSelect: this.selectHandler
    })
  },
  methods: {
    showPicker() {
      this.picker.show()
    },
    selectHandler(selectedVal, selectedIndex, selectedTxt) {
      this.selected = selectedTxt
      this.$emit('input', selectedVal)
    }
  }
}

export default PCAComponent;
