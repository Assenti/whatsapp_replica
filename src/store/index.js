import Vue from 'vue'
import Vuex from 'vuex'
import { Base64 } from '../services/decodeService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: decodeUserInfo(localStorage.getItem('user')) || null,
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
    getUserFullName(state) {
      if(state.user) {
        return `${state.user.firstname} ${state.user.lastname}`
      }
    },
    getUserStatus(state) {
      if(state.user) {
        return state.user.status
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
      localStorage.setItem('user', user)
      context.commit('setUser', decodeUserInfo(user))
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

function decodeUserInfo(userInfo) {
  if(userInfo) {
    return JSON.parse(Base64.decode(userInfo))
  }
  else return null
}
