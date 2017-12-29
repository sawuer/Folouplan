import template from './template.html'

export default {
  props: ['title'],
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
