import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import * as Firebase from 'firebase'
import Vuetify from 'vuetify'
import('./../node_modules/vuetify/dist/vuetify.min.css')
import('./../node_modules/vuetify/dist/vuetify.min.js')
import('./assets/css/style.css')
import { store } from './store/store'
import Alert from '@/components/Alert'
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)

Vue.component('app-alert', Alert)

const app = Firebase.initializeApp({
  apiKey: 'AIzaSyAmplgxIdyy9lxh2Pj1Z1CCqmnShxpCX_k',
  authDomain: 'ramona-6e161.firebaseapp.com',
  databaseURL: 'https://ramona-6e161.firebaseio.com',
  projectId: 'ramona-6e161',
  storageBucket: 'ramona-6e161.appspot.com'
  // messagingSenderId: '73956155263'
})
const db = app.database()
const users = db.ref('users')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mounted () {
    this.$store.dispatch('setUsersInFirebase', users)
    console.log('On start')
    console.log(this.$store.getters.usersInFirebase)
    console.log(this.$store.getters.user)
    console.log(this.$store.getters.newUserId)
    console.log(this.$store.getters.userKey)
    if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
      this.$router.push(this.$store.getters.currentURL)
    } else {
      this.$router.push('/signin')
    }
  },
  updated () {
    console.log(this.$store.getters.user)
  },
  store,
  firebase: {
    users
  },
  data: {
  },
  router,
  template: '<App/>',
  components: { App },
  methods: {
  }
})
