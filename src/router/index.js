import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/components/Auth'
import targets from './../components/targets/targets'
import money from './../components/money/money'
import signin from './../components/signin/signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/targets', component: targets },
    { path: '/signup', component: Auth },
    { path: '/money', component: money },
    { path: '/signin', component: signin }
  ]
})
