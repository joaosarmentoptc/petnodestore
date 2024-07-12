import axios from 'axios'

const PAGINATION_LIMIT = import.meta.env.VITE_PAGINATION_LIMIT

export default {
  namespaced: true,
  state: {
    catalog: [],
    count: 0,
    previousPage: '',
    nextPage: ''
  },
  mutations: {
    updateCatalog(state, catalog) {
      state.catalog = catalog
    },
    updateCount(state, count) {
      state.count = count
    },
    updatePages(state, { previousPage, nextPage }) {
      state.previousPage = previousPage
      state.nextPage = nextPage
    }
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.count / PAGINATION_LIMIT)
    }
  },
  actions: {
    async getProductList({ commit }, offset, limit) {
      let products = []
      let count = 0
      let previousPage = null
      let nextPage = null
      try {
        if (!offset) offset = 0
        if (!limit) limit = PAGINATION_LIMIT

        const res = await axios.get(`/api/catalog?offset=${offset}&limit=${limit}`)

        count = res.data.count
        previousPage = res.data.prev
        nextPage = res.data.next

        if (res.data.rows.length > 0) products = res.data.rows
      } catch (error) {
        console.log(error)
        throw new Error(error.response.data.error)
      } finally {
        commit('updateCatalog', products)
        commit('updateCount', count)
        commit('updatePages', { previousPage, nextPage })
      }
    }
  }
}
