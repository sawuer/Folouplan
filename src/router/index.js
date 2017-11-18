import Vue from 'vue'
import Router from 'vue-router'

// Components
import Todo from '@/components/Todo'
import Auth from '@/components/Auth'
import Money from '@/components/Money'
import Signin from '@/components/Signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/todolist', component: Todo },
    { path: '/signup', component: Auth },
    { path: '/money', component: Money },
    { path: '/signin', component: Signin }
    // { path: '/notes', component: Diary },
  ]
})
