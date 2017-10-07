import Vuex from 'vuex'
import Vue from 'vue'
import * as Firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appName: 'Ramona',
    currentURL: null,
    user: null,
    usersInFirebase: null,
    newUserId: null
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
    clearError (state) {
      state.clearError = null
    },
    setNewUserId (state, payload) {
      state.newUserId = payload
    }
  },
  actions: {
    setNewUserId ({commit}, value) {
      commit('setNewUserId', value)
    },
    setURL ({commit}) {
      commit('setURL')
    },
    setUsersInFirebase ({commit}, users) {
      commit('setUsersInFirebase', users)
    },
    signUserUp ({commit, state, dispatch}, userData) {
      Firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        dispatch('setNewUserId', user.uid)
      })
    },
    signUserIn ({commit}, userData) {
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          this.state.usersInFirebase.once('value').then(snapshot => {
            snapshot.forEach(userSnapshot => {
              var username = userSnapshot.val()
              if (username.id === user.uid) {
                commit('setUser', {
                  id: user.uid,
                  email: Firebase.auth().currentUser.email,
                  key: userSnapshot.key
                })
              }
            })
          })
        })
    },
    logOut ({commit}) {
      commit('setUser', null)
      Firebase.auth().signOut()
    }
  },
  getters: {
    appName: state => state.appName,
    currentURL: state => state.currentURL,
    user: state => state.user,
    usersInFirebase: state => state.usersInFirebase,
    newUserId: state => state.newUserId
  }
})

