import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default {
  namespaced: true,
  state: {
    user: {},
    isAuthenticated: !!localStorage.getItem('jwtToken')
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.user = user
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    }
  },
  actions: {
    async register({ commit, dispatch }, userData) {
      try {
        const res = await axios.post('/api/user/register', userData)

        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        commit('setAuthentication', true)
        dispatch('getUserFromToken')

        return res.data
      } catch (error) {
        throw new Error(error.response.data.error)
      }
    },

    async login({ commit, dispatch }, userData) {
      try {
        const res = await axios.post('/api/user/login', userData)
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        commit('setAuthentication', true)
        dispatch('getUserFromToken')
      } catch (error) {
        throw new Error(error.response.data.error)
      } finally {
        dispatch('cart/getCartItems', null, { root: true })
      }
    },

    logout({ commit, dispatch }) {
      commit('setAuthentication', false)
      localStorage.removeItem('jwtToken')
      dispatch('getUserFromToken')
    },

    getUserFromToken({ commit, dispatch }) {
      const token = localStorage.getItem('jwtToken')

      let user = {}

      try {
        if (token) {
          const decoded = jwtDecode(token)
          if (!decoded.exp || decoded.exp < Date.now() / 1000) {
            dispatch('logout')
            return
          }
          user = {
            email: decoded.email,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            userid: decoded.userId
          }
        }
      } catch (error) {
        console.error('Error decoding token', error)
      } finally {
        commit('updateCurrentUser', user)
      }
    }
  },
  getters: {
    currentUser(state) {
      return state.user.userid ? state.user : null
    },
    isAuthenticated: (state) => state.isAuthenticated
  }
}
