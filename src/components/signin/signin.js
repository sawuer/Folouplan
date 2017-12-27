import { mapGetters, mapActions } from 'vuex'
import error from '../error/error.js'
import template from './signin.html'

export default {
  template,
  components: {
    error
  },
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
      }).then(_ => {
        setTimeout(_ => {
          if (this.user !== null) {
            this.$router.push('/money')
          } else {
            this.$router.push('/signin')
          }
        }, 1500)
      })
    },
    clearForm () {
      this.email = ''
      this.password = ''
    }
  }
}
