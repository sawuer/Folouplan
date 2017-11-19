import Vue from 'vue'
import Router from 'vue-router'

import Todo from '@/components/Todo'
import Auth from '@/components/Auth'
import money from '@/components/money/money'
import Signin from '@/components/Signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/todolist', component: Todo },
    { path: '/signup', component: Auth },
    { path: '/money', component: money },
    { path: '/signin', component: Signin }
  ]
})
