import { mapGetters, mapActions } from 'vuex'
import template from './navigation.html'
import user from './../user/user'

export default {
  template,
  name: 'navigation',
  components: { user },
  mounted () {
    this.clickOnNavItem()
  },
  methods: {
    ...mapActions([
      'setURL'
    ]),
    clickOnNavItem () {
      this.setURL()
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
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
      return this.user !== null && this.user !== undefined
    }
  }
}
