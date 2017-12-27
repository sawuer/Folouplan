import { mapGetters, mapActions } from 'vuex'
import error from '../error/error.js'
import methods from './methods.js'
import data from './data.js'
import template from './signin.html'

export default {
  template,
  data: () => data,
  components: { error },
  computed: mapGetters([
    'user'
  ]),
  methods: {
    ...methods,
    ...mapActions([
      'signUserIn'
    ])
  }
}
