import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/Todo'
import Mindmaps from '@/components/Mindmaps'
import Money from '@/components/Money'
import Diary from '@/components/Diary'
import Challenges from '@/components/Challenges'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/todolist', component: Todo },
    { path: '/mindmaps', component: Mindmaps },
    { path: '/money', component: Money },
    { path: '/diary', component: Diary },
    { path: '/challenges', component: Challenges }
  ]
})
