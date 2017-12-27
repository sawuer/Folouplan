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
      password: '',
      valid: {
        wrongEmailRule: false,
        wrongPassword: false
      }
    }
  },
  methods: {
    ...mapActions([
      'signUserIn'
    ]),
    isEmailCorrect (email, state) {
      if (/([\w-\\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g.test(email)) {
        return true
      }
      return false
    },
    onSignin () {
      if (this.isEmailCorrect(this.email)) {
        this.valid.wrongEmailRule = false
      } else {
        this.valid.wrongEmailRule = true
        return
      }
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
