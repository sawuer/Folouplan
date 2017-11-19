import { mapGetters, mapActions } from 'vuex'
import template from './signin.html'

export default {
  template,
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'signUserIn'
    ]),
    onSignin () {
      this.signUserIn({
        email: this.email,
        password: this.password
      }).then(i => {
        setTimeout(() => {
          if (this.user !== null) {
            this.$router.push('/money')
          } else {
            this.$router.push('/signin')
          }
        }, 1500)
      })
    },
    clear () {
      this.email = ''
      this.password = ''
    }
  }
}
