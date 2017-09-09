import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import('./../node_modules/vuetify/dist/vuetify.min.css')
import('./assets/css/style.css')
import('./../node_modules/vuetify/dist/vuetify.min.js')
Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
