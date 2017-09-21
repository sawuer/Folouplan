import Vuex from 'vuex'
import Vue from 'vue'
import * as Firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userDatas: [
      { id: 11, money: '11', todo: '1111' },
      { id: 22, money: '22', todo: '2222' },
      { id: 33, money: '33', todo: '3333' }
    ],
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({commit}, userData) {
      Firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        const newUser = {
          id: user.uid,
          userDataId: []
        }
        commit('setUser', newUser)
      })
      .catch(error => console.log(error))
    }
  },
  getters: {
    userDatas (state) {
      return state.userDatas
    },
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

