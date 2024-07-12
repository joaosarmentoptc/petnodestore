import { createStore } from 'vuex'
import users from './modules/users'
import catalog from './modules/catalog'
import cart from './modules/cart'

export default createStore({
  modules: {
    users,
    catalog,
    cart
  }
})
