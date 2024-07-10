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
      const res = await axios.post('/api/user/register', userData)
      if (res.status !== 201) {
        throw new Error('Failed to register user')
      }
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      commit('setAuthentication', true)
      dispatch('getUserFromToken')
      return res.data
    },

    logout({ commit, dispatch }) {
      commit('setAuthentication', false)
      localStorage.removeItem('jwtToken')
      dispatch('getUserFromToken')
    },

    getUserFromToken({ commit }) {
      const token = localStorage.getItem('jwtToken')

      let user = {}

      try {
        if (token) {
          const decoded = jwtDecode(token)
          user = {
            email: decoded.email,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            userid: decoded.userId
          }
        }
      } catch (error) {
        console.error('Error decoding token', error)
        commit('updateCurrentUser', user)
      }
      commit('updateCurrentUser', user)
    }
  },
  getters: {
    currentUser(state) {
      return state.user.userid ? state.user : null
    },
    isAuthenticated: (state) => state.isAuthenticated
  }
}
