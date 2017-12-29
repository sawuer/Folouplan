import Vue from 'vue'
import Router from 'vue-router'

import auth from './../components/auth/auth'
import targets from './../components/targets/targets'
import money from './../components/money/money'
import signin from './../components/signin/signin'
import settings from './../components/settings/settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signup', component: auth },
    { path: '/signin', component: signin },
    { path: '/money', component: money },
    { path: '/targets', component: targets },
    { path: '/settings', component: settings }
  ]
})
