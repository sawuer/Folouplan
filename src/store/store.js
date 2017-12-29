import Vuex from 'vuex'
import Vue from 'vue'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    usersInFirebase: null,
    newUserId: null,
    userData: null,
    wrongUser: false
  },
  mutations: {
    setUser (state, val) {
      state.user = val
    },
    setUsersInFirebase (state, val) {
      state.usersInFirebase = val
    },
    setNewUserId (state, val) {
      state.newUserId = val
    },
    setUserData (state, val) {
      state.userData = val
    },
    setWrongUser (state, val) {
      state.wrongUser = val
    }
  },
  actions: {
    setUserData ({commit, state}, value) {
      return firebase.database()
        .ref('/users/' + state.user.key)
        .once('value')
        .then(snapshot => {
          commit('setUserData', snapshot.val())
        })
    },
    // setNewUserId ({ commit }, value) {
      // commit('setNewUserId', value)
    // },
    setUsersInFirebase ({ commit }, users) {
      commit('setUsersInFirebase', users)
    },
    signUserUp ({ commit }, userData) {
      firebase.auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          // dispatch('setNewUserId', user.uid)
          commit('setNewUserId', user.uid)
        })
    },
    signUserIn ({ commit, state }, userData) {
      firebase.auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          return this.state.usersInFirebase.once('value').then(snapshot => {
            snapshot.forEach(i => {
              if (i.val().id === user.uid) {
                commit('setUser', {
                  id: user.uid,
                  email: firebase.auth().currentUser.email,
                  key: i.key
                })
                commit('setWrongUser', false)
              }
            })
          })
        })
        .catch(err => {
          commit('setWrongUser', true)
          throw new Error(err)
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
    usersInFirebase: state => state.usersInFirebase,
    userData: state => state.userData,
    wrongUser: state => state.wrongUser
  }
})

