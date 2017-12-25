import template from './modal.html'

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
