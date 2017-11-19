// import { mapGetters } from 'vuex'
import template from './navigation.html'
import user from './../user/user'

export default {
  template,
  name: 'navigation',
  components: { user },
  // computed: {
  //   ...mapGetters([
  //     'user'
  //   ])
  // },
  mounted () {
    this.clickOnNavItem()
  },
  methods: {
    clickOnNavItem () {
      this.$store.dispatch('setURL')
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { title: 'Sign up', path: '/signup', icon: 'face' },
        { title: 'Sign in', path: '/signin', icon: 'lock_on' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: 'Targets', path: '/targets', icon: 'storage' },
          { title: 'Money', path: '/money', icon: 'attach_money' }
          // { title: 'Notes', path: '/notes', icon: 'book' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
