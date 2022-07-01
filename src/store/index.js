import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    getToken: '',
    cityName: '',
    CityInfo: {}
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.getToken = payload
    },
    removeToken (state) {
      state.getToken = ''
    },
    setCityName (state, payload) {
      state.cityName = payload
    },
    setcityInfo (state, payload) {
      state.CityInfo = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
