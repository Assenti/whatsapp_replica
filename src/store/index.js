import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    activeChat: null
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
    },
    getUserId(state) {
      if(state.user) {
        return state.user._id
      }
    },
    getActiveChat(state) {
      if(state.activeChat) {
        return state.activeChat
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setActiveChat(state, chat) {
      state.activeChat = chat
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
    },
    setActiveChat(context, chat) {
      context.commit('setActiveChat', chat)
    }
  }
})
