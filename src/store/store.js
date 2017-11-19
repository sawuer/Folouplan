import Vuex from 'vuex'
import Vue from 'vue'
import * as firebase from 'firebase'
Vue.use(Vuex)

// var hardCodeUser = {
//   email: 'ruslan.timurziyev@gmail.com',
//   id: 'V2trMkzu0LckVpvGC8ZibNWPAko2',
//   key: '-Ky4uln2SRRZ6prMW0m6'
// }

export const store = new Vuex.Store({
  state: {
    currentURL: null,
    user: null,
    usersInFirebase: null,
    newUserId: null
  },
  mutations: {
    setURL (state) {
      state.currentURL = window.location.href.slice(window.location.href.lastIndexOf('/'))
    },
    setUser (state, val) {
      state.user = val
    },
    setUsersInFirebase (state, val) {
      state.usersInFirebase = val
    },
    setNewUserId (state, val) {
      state.newUserId = val
    }
  },
  actions: {
    setNewUserId ({ commit }, value) {
      commit('setNewUserId', value)
    },
    setURL ({ commit }) {
      commit('setURL')
    },
    setUsersInFirebase ({ commit }, users) {
      commit('setUsersInFirebase', users)
    },
    signUserUp ({ dispatch }, userData) {
      firebase.auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          dispatch('setNewUserId', user.uid)
        })
    },
    signUserIn ({ commit }, userData) {
      firebase.auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          this.state.usersInFirebase.once('value').then(snapshot => {
            snapshot.forEach(i => {
              if (i.val().id === user.uid) {
                commit('setUser', {
                  id: user.uid,
                  email: firebase.auth().currentUser.email,
                  key: i.key
                })
              }
            })
          })
        })
    },
    logOut ({ commit }) {
      commit('setUser', null)
      firebase.auth().signOut()
    }
  },
  getters: {
    currentURL: state => state.currentURL,
    user: state => state.user,
    newUserId: state => state.newUserId
  }
})

