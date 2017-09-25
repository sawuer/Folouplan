import Vuex from 'vuex'
import Vue from 'vue'
import * as Firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appName: 'Gven',
    currentURL: null,
    user: null,
    usersInFirebase: null,
    newUserId: 212,
    userKey: null,
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
    setUsersInFirebase (state, payload) {
      state.usersInFirebase = payload
    },
    setUserData (state, payload) {
      state.currentUserData = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.clearError = null
    },
    setUserKey (state, payload) {
      state.userKey = payload
    },
    setNewUserId (state, payload) {
      state.newUserId = payload
      console.log(payload)
      console.log(state.newUserId)
    }
  },
  actions: {
    setURL ({commit}) {
      commit('setURL')
    },
    setUsersInFirebase ({commit}, users) {
      commit('setUsersInFirebase', users)
    },
    signUserUp ({commit}, userData) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        console.log(user.uid)
        commit('setNewUserId', user.uid)
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          data: null
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
          data: user.data
        }
        this.state.usersInFirebase.once('value').then(function (snapshot) {
          snapshot.forEach(function (userSnapshot) {
            var username = userSnapshot.val()
            if (username.id === user.uid) {
              console.log(userSnapshot.key)
              commit('setUserKey', userSnapshot.key)
              console.log(userSnapshot.key)
              newUser.data = username.data
            }
          })
        })
        commit('setUser', newUser)
        commit('setUserData', newUser.data)
        console.log(this.state.user)
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
    setUserData (state) {
      return (userDataId) => {
        return state.userDatas.find((userData) => {
          return userData.id === userDataId
        })
      }
    },
    user: state => state.user,
    usersInFirebase: state => state.usersInFirebase,
    userKey: state => state.userKey,
    newUserId: state => state.newUserId
  }
})

