import Vue from 'vue'
import Router from 'vue-router'

import auth from './../components/auth/auth'
import targets from './../components/targets/targets'
import money from './../components/money/money'
import signin from './../components/signin/signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signup', component: auth },
    { path: '/signin', component: signin },
    { path: '/targets', component: targets },
    { path: '/money', component: money }
  ]
})
