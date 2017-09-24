import Vuex from 'vuex'
import Vue from 'vue'
import * as Firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appName: 'Gven',
    userDatas: [
      { id: 11, money: '11', todo: '1111' },
      { id: 22, money: '22', todo: '2222' },
      { id: 33, money: '33', todo: '3333' }
    ],
    currentURL: null,
    user: 1,
    loading: false,
    error: null
  },
  mutations: {
    setURL (state) {
      state.currentURL = window.location.href.slice(window.location.href.lastIndexOf('/'))
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.clearError = null
    }
  },
  actions: {
    setURL ({commit}) {
      commit('setURL')
    },
    signUserUp ({commit}, userData) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          userDataId: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    signUserIn ({commit}, userData) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          userDataId: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    logOut ({commit}) {
      commit('setUser', null)
    }
  },
  getters: {
    appName: state => state.appName,
    currentURL: state => state.currentURL,
    userDatas: state => state.userDatas,
    setUserData (state) {
      return (userDataId) => {
        return state.userDatas.find((userData) => {
          return userData.id === userDataId
        })
      }
    },
    user: state => state.user
  }
})

