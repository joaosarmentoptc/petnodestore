import { createStore } from 'vuex'
import users from './modules/users'
import catalog from './modules/catalog'

export default createStore({
  modules: {
    users,
    catalog
  }
})
