import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  getters: {
    isLoggedIn(state) {
      if(state.user) {
        return true
      }
      else return false 
    },
    getToken(state) {
      if(state.user) {
        return state.user.token
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    setUser(context, user) {
      localStorage.setItem('user', JSON.stringify(user))
      context.commit('setUser', user)
    },
    unsetUser(context) {
      localStorage.removeItem('user')
      context.commit('setUser', null)
    }
  }
})
