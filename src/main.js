import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import('./../node_modules/vuetify/dist/vuetify.min.css')
import('./assets/css/style.css')
// import('./assets/css/mindmap.min.css')
// import('./assets/js/mindmap.min.js')
import('./../node_modules/vuetify/dist/vuetify.min.js')
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)

// import Firebase from 'firebase'

// var app = Firebase.initializeApp({
//   apiKey: 'AIzaSyAmplgxIdyy9lxh2Pj1Z1CCqmnShxpCX_k',
//   authDomain: 'ramona-6e161.firebaseapp.com',
//   databaseURL: 'https://ramona-6e161.firebaseio.com',
//   projectId: 'ramona-6e161',
//   storageBucket: 'ramona-6e161.appspot.com',
//   messagingSenderId: '73956155263'
// })

// var db = app.database()
// console.log(db)
// var auth = app.auth()
// var provider = new Firebase.auth.GoogleAuthProvider()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  ready () {
    // auth.onAuthStateChanged(function (user) {
    //   if (user) {
    //     console.info('Connect')
    //   } else {
    //     console.warn('No connect')
    //   }
    // })
  },
  data: {
    data: false,
    activity: null
  },
  router,
  template: '<App/>',
  components: { App },
  methods: {
    // connect () {
    //   Firebase.auth().signInWithPopup(provider).then(function (result) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken
    //     // The signed-in user info.
    //     var user = result.user
    //     // ...
    //     console.log(token, user)
    //   }).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code
    //     var errorMessage = error.message
    //     // The email of the user's account used.
    //     var email = error.email
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential
    //     console.log(errorCode, errorMessage, email, credential)
    //     // ...
    //   })
    // },
    deconnect () {

    }
  }
})
