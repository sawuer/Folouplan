// import { mapGetters } from 'vuex'
import template from './user.html'

export default {
  template,
  name: 'user',
  data () {
    return {
      emailDropdown: [{ title: 'Logout' }]
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push('/signin')
    }
  }
}
