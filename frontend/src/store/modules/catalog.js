import axios from 'axios'

export default {
  namespaced: true,
  state: {
    catalog: []
  },
  mutations: {
    updateCatalog(state, catalog) {
      state.catalog = catalog
    }
  },
  actions: {
    async getProductList({ commit }, offset, limit) {
      let products = []
      try {
        if (!offset) offset = 0
        if (!limit) limit = 10

        const res = await axios.get(`/api/catalog?offset=${offset}&limit=${limit}`)

        if (res.data.rows.length > 0) products = res.data.rows
      } catch (error) {
        console.log(error)
        throw new Error(error.response.data.error)
      } finally {
        commit('updateCatalog', products)
      }
    }
  }
}
