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
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)

const dbConfs = Firebase.initializeApp({
  apiKey: 'AIzaSyAmplgxIdyy9lxh2Pj1Z1CCqmnShxpCX_k',
  authDomain: 'ramona-6e161.firebaseapp.com',
  databaseURL: 'https://ramona-6e161.firebaseio.com',
  projectId: 'ramona-6e161',
  storageBucket: 'ramona-6e161.appspot.com'
  // messagingSenderId: '73956155263'
})
const db = dbConfs.database()
const users = db.ref('users')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  updated () {
    console.table({
      'User': this.$store.getters.user,
      'User key': this.$store.getters.userKey,
      'Users': this.$store.getters.usersInFirebase,
      'newUserId': this.$store.getters.newUserId
    })
  },
  mounted () {
    this.$store.dispatch('setUsersInFirebase', users)
    if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
      this.$router.push(this.$store.getters.currentURL)
    } else {
      this.$router.push('/signin')
    }
  },
  store,
  firebase: {
    users
  },
  router,
  template: '<App/>',
  components: { App },
  methods: {
  }
})
