import Vue from 'vue'
import Router from 'vue-router'

import auth from './../components/auth/auth'
import targets from './../components/targets/targets'
import money from './../components/money/money'
import signin from './../components/signin/signin'
import settings from './../components/settings/settings'
// import notes from './../components/notes/notes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/targets', component: targets },
    { path: '/signup', component: auth },
    { path: '/money', component: money },
    { path: '/signin', component: signin },
    { path: '/settings', component: settings }
    // { path: '/notes', component: notes }
  ]
})
