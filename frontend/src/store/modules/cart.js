import axios from 'axios'

const prepareRequest = () => {
  const token = localStorage.getItem('jwtToken')
  if (!token) return null
  const headers = { Authorization: token }
  return headers
}

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
        const headers = prepareRequest()
        if (!headers) return
        cart = await axios.get('api/cart', { headers: headers })
      } catch (error) {
        console.error(error)
      } finally {
        commit('setCart', cart.data)
      }
    },
    async addItemToCart({ dispatch }, requestData) {
      try {
        const headers = prepareRequest()
        if (!headers) return
        const quantity = Number(requestData.quantity)
        const productId = Number(requestData.productId)
        const res = await axios.put('api/cart', { quantity, productId }, { headers: headers })
        console.log(res)
      } catch (error) {
        console.error(error)
      } finally {
        dispatch('getCartItems')
      }
    },
    async deleteItemFromCart({ dispatch }, { productId, quantity }) {
      try {
        productId = Number(productId)
        quantity = Number(quantity)
        const headers = prepareRequest()
        if (!headers) return
        await axios.delete('api/cart', { headers, data: { productId, quantity } })
        dispatch('getCartItems')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
