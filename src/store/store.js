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
    setURL ({commit}) {
      commit('setURL')
    },
    setUsersInFirebase ({commit}, users) {
      commit('setUsersInFirebase', users)
    },
    signUserUp ({commit}, userData) {
      // commit('setLoading', true)
      Firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      // .then(user => {
        // console.log(user.uid)
        // commit('setNewUserId', user.uid)
        // commit('setLoading', false)
        // const newUser = {
        //   id: user.uid,
        //   data: null
        // }
        // console.log(newUser)
      // })
    },
    signUserIn ({commit}, userData) {
      // commit('setLoading', true)
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        // commit('setLoading', false)
        const newUser = {
          id: user.uid
          // data: user.data
        }
        this.state.usersInFirebase.once('value').then(function (snapshot) {
          snapshot.forEach(function (userSnapshot) {
            var username = userSnapshot.val()
            if (username.id === user.uid) {
              commit('setUserKey', userSnapshot.key)
              // newUser.data = username.data
            }
          })
        })
        commit('setUser', newUser)
        commit('setCurrentUserEmail', Firebase.auth().currentUser.email)
        console.log(this.state.user)
        console.log(this.state.userKey)
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

