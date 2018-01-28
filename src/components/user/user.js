import { mapActions } from 'vuex'
import template from './user.html'

export default {
  template,
  name: 'user',
  methods: {
    ...mapActions([
      'logOut'
    ]),
    exit () {
      this.logOut()
      this.$router.push('/signin')
    }
  }
}
