import template from './template.html'

export default {
  template,
  name: 'user',
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push('/signin')
    }
  }
}
