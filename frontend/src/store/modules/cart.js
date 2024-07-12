import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: [],
    loaded: false
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
      state.loaded = true
    }
  },
  actions: {
    async getCartItems({ commit }) {
      let cart = []
      try {
        const token = localStorage.getItem('jwtToken')
        if (!token) return
        const headers = { Authorization: token }
        cart = await axios.get('api/cart', { headers: headers })
      } catch (error) {
        console.error(error)
      } finally {
        commit('setCart', cart.data)
      }
    }
  }
}
