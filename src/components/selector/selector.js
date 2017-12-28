import template from './template.html'

export default {
  props: ['items', 'default'],
  data: () => ({
    list: false,
    selected: ''
  }),
  mounted () {
    this.selected = this.default
  },
  methods: {
    select (item) {
      this.selected = item
      this.showList()
    },
    showList () {
      this.list = !this.list
    }
  },
  template
}
