import { mapGetters, mapActions } from 'vuex'
import template from './auth.html'

export default {
  template,
  name: 'Auth',
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Password do not match' : true
    },
    ...mapGetters([
      'newUserId'
    ])
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions([
      'signUserUp'
    ]),
    onSignup () {
      this.signUserUp({
        email: this.email,
        password: this.password
      })
        .then(i => this.$router.push('/signin'))
        .then(i => {
          setTimeout(() => {
            this.$root.$firebaseRefs.users.push({
              id: this.newUserId
            })
          }, 2000)
        })
    },
    clear () {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
}
