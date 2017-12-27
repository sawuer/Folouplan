import template from './template.html'

export default {
  template,
  data () {
    return {
      show: false
    }
  },
  methods: {
    setShow () {
      this.show = !this.show
    }
  }
}
