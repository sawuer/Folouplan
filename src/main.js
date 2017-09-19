import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import Vuetify from 'vuetify'
import('./../node_modules/vuetify/dist/vuetify.min.css')
import('./assets/css/style.css')
// import('./assets/css/mindmap.min.css')
// import('./assets/js/mindmap.min.js')
import('./../node_modules/vuetify/dist/vuetify.min.js')
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)

const app = Firebase.initializeApp({
  apiKey: 'AIzaSyAmplgxIdyy9lxh2Pj1Z1CCqmnShxpCX_k',
  authDomain: 'ramona-6e161.firebaseapp.com',
  databaseURL: 'https://ramona-6e161.firebaseio.com',
  projectId: 'ramona-6e161',
  storageBucket: 'ramona-6e161.appspot.com',
  messagingSenderId: '73956155263'
})

const db = app.database()
const todosRef = db.ref('todos')
const doneTodosRef = db.ref('doneTodos')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  ready () {
  },
  firebase: {
    todos: todosRef,
    doneTodos: doneTodosRef
  },
  data: {
    db,
    todosRef,
    doneTodosRef
  },
  router,
  template: '<App/>',
  components: { App },
  methods: {
  }
})
