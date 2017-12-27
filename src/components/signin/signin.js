import { mapGetters, mapActions } from 'vuex'
import error from '../error/error.js'
import template from './signin.html'
import methods from './methods.js'
import data from './data.js'

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
