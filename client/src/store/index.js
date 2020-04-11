import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    sellerContacts: [],
    pasar: [],
    selectedPasarId: 'all',
    query: '',
    news: []
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setContacts (state, payload) {
      state.sellerContacts = payload
    },
    setPasar (state, payload) {
      state.pasar = payload
    },
    setSelectedPasar (state, payload) {
      state.selectedPasarId = payload
    },
    setQuery (state, payload) {
      state.query = payload
    },
    setNews (state, payload) {
      state.news = payload
    }
  },
  actions: {
  },
  getters: {
    selectedPasar: (state) => () => {
      return state.pasar.find(el => el.id === state.selectedPasarId.toString())
    }
  },
  modules: {
  }
})
