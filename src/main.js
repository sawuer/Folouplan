import Vue from 'vue'
import app from './app'
import router from './router'
import VueFire from 'vuefire'
import * as Firebase from 'firebase'
import('./assets/css/style.css')
import { store } from './store/store'
// Vue.config.productionTip = false
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
  mounted () {
    this.$store.dispatch('setUsersInFirebase', users)
    if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
      this.$router.push(this.$store.getters.currentURL)
    } else {
      this.$router.push('/signin')
    }
  },
  store,
  firebase: { users },
  router,
  template: '<app/>',
  components: { app }
})
