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
    userKey: null,
    currentUserEmail: null
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
    },
    setCurrentUserEmail (state, payload) {
      state.currentUserEmail = payload
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
      // commit('setLoading', true)
      Firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        console.log(user.uid)
        dispatch('setNewUserId', user.uid)
        console.log(state.newUserId)
      })
    },
    signUserIn ({commit}, userData) {
      // commit('setLoading', true)
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        // commit('setLoading', false)
        const existingUser = {
          id: user.uid
          // data: user.data
        }
        this.state.usersInFirebase.once('value').then(function (snapshot) {
          snapshot.forEach(function (userSnapshot) {
            var username = userSnapshot.val()
            console.log(username.id, user.uid)
            if (username.id === user.uid) {
              // commit('setUserKey', userSnapshot.key)
              console.log(user.uid)
            }
          })
        })
        commit('setUser', existingUser)
        commit('setCurrentUserEmail', Firebase.auth().currentUser.email)
        console.log(this.state.user)
        console.log(this.state.usersInFirebase)
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
    newUserId: state => state.newUserId,
    currentUserEmail: state => state.currentUserEmail
  }
})

