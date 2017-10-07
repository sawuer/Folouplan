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
    newUserId: null,
    userKey: null
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
    setUserKey (state, payload) {
      state.userKey = payload
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
        console.log(user.uid)
        dispatch('setNewUserId', user.uid)
        console.log(state.newUserId)
      })
    },
    signUserIn ({commit}, userData) {
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          const existingUser = {
            id: user.uid
          }
          this.state.usersInFirebase.once('value').then(snapshot => {
            snapshot.forEach(userSnapshot => {
              var username = userSnapshot.val()
              console.log(username.id, user.uid)
              if (username.id === user.uid) {
                commit('setUserKey', userSnapshot.key)
                console.log(user.uid)
              }
            })
          })
          commit('setUser', {
            id: existingUser.id,
            email: Firebase.auth().currentUser.email
          })
          // commit('setCurrentUserEmail', Firebase.auth().currentUser.email)
        })
    },
    logOut ({commit}) {
      commit('setUser', null)
      commit('setUserKey', null)
      Firebase.auth().signOut()
    }
  },
  getters: {
    appName: state => state.appName,
    currentURL: state => state.currentURL,
    user: state => state.user,
    usersInFirebase: state => state.usersInFirebase,
    userKey: state => state.userKey,
    newUserId: state => state.newUserId
  }
})

