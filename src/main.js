import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import * as Firebase from 'firebase'
import Vuetify from 'vuetify'
import('./../node_modules/vuetify/dist/vuetify.min.css')
import('./assets/css/style.css')
import { store } from './store/store'
import('./../node_modules/vuetify/dist/vuetify.min.js')
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)
console.log(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  mounted () {
    if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
      this.$router.push('/todolist')
    } else {
      this.$router.push('/signin')
    }
  },
  created () {
    const app = Firebase.initializeApp({
      apiKey: 'AIzaSyAmplgxIdyy9lxh2Pj1Z1CCqmnShxpCX_k',
      authDomain: 'ramona-6e161.firebaseapp.com',
      databaseURL: 'https://ramona-6e161.firebaseio.com',
      projectId: 'ramona-6e161',
      storageBucket: 'ramona-6e161.appspot.com'
      // messagingSenderId: '73956155263'
    })
    const db = app.database()
    const todos = db.ref('todos')
    const doneTodos = db.ref('doneTodos')
    console.log(todos, doneTodos)
  },
  store,
  firebase: {
    // todos,
    // doneTodos
  },
  data: {
  },
  router,
  template: '<App/>',
  components: { App },
  methods: {
  }
})
