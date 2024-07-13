import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/home/HomePage.vue'
import RegisterUser from '@/components/user/RegisterUser.vue'
import LoginUser from '@/components/user/LoginUser.vue'
import ShoppingCart from '@/components/cart/ShoppingCart.vue'
import { useStore } from 'vuex'

const userAuthenticated = (to, from, next) => {
  const store = useStore()

  if (!store.state.users.isAuthenticated) {
    next({
      name: 'loginUser',
      query: { redirect: to.fullPath }
    })
  } else next()
}

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
    },
    {
      path: '/cart',
      name: 'shoppingCart',
      component: ShoppingCart,
      beforeEnter: userAuthenticated
    }
  ]
})

export default router
