import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/home/HomePage.vue'
import RegisterUser from '@/components/user/RegisterUser.vue'
import LoginUser from '@/components/user/LoginUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/register',
      name: 'registerUser',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'loginUser',
      component: LoginUser
    }
  ]
})

export default router
