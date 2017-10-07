import Vuex from 'vuex'
import Vue from 'vue'
import * as Firebase from 'firebase'
Vue.use(Vuex)

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
      Firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
          .then(user => {
            dispatch('setNewUserId', user.uid)
          })
    },
    signUserIn ({ commit }, userData) {
      Firebase
        .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then(user => {
            this.state.usersInFirebase.once('value').then(snapshot => {
              snapshot.forEach(userSnapshot => {
                if (userSnapshot.val().id === user.uid) {
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
    logOut ({ commit }) {
      commit('setUser', null)
      Firebase.auth().signOut()
    }
  },
  getters: {
    currentURL: state => state.currentURL,
    user: state => state.user,
    newUserId: state => state.newUserId
  }
})

