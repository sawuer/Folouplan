import { mapGetters } from 'vuex'
import error from '../error/error.js'
import template from './template.html'
import methods from './methods/_all.js'
import data from './data.js'

export default {
  template,
  name: 'Signin',
  methods,
  data: () => data,
  components: { error },
  computed: mapGetters([
    'user',
    'wrongUser'
  ])
}
