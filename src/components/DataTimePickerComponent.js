//省市县选择
const DataTimePickerComponent = {
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
    }, this.selected.length ? this.selected.join('') : '点击选择时间')
  },
  mounted() {
    // this.picker = this.$createCascadePicker({
    //   title: '籍贯选择',
    //   data: cityData,
    //   selectedIndex: this.value,
    //   onSelect: this.selectHandler
    // })
    this.dateTimePicker = this.$createDatePicker({
      title: '选择案发时间',
      min: new Date(2008, 7, 8, 8, 0, 0),
      max: new Date(2199, 9, 20, 20, 59, 59),
      value: new Date(),
      columnCount: 6,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle,
      format: {
        year: 'YY年',
        month: 'MM月',
        date: 'D日',
        hour: 'hh时', minute: 'mm分', second: 'ss秒'
      },
    })

  },
  methods: {
    showPicker() {
      this.dateTimePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      // console.log(date);
      // console.log(selectedVal);
      // console.log(selectedText);
      // this.formModel.caseDatetime = `${selectedText.join('')}`
      this.selected = selectedText
      this.$emit('input', selectedVal)
    },
    cancelHandle() {

    }

    // showPicker() {
    //   this.picker.show()
    // },
    // selectHandler(selectedVal, selectedIndex, selectedTxt) {
    //   this.selected = selectedTxt
    //   this.$emit('input', selectedVal)
    // }
  }
}

export default DataTimePickerComponent;
