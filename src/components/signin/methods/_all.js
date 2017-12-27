import { mapActions } from 'vuex'
import emailValidate from './emailValidate.js'
import passwordValidate from './passwordValidate.js'
import onSignin from './onSignin.js'

export default {
  emailValidate,
  passwordValidate,
  onSignin,
  ...mapActions([
    'signUserIn'
  ]),
  isEmailFull (email) {
    if (email !== '') {
      return true
    }
    return false
  },
  isEmailExists () {
    var usersRef = this.$root.$firebaseRefs.users
    usersRef.once('value', snapshot => {
      console.log(snapshot.val())
      // userExistsCallback(userId, exists);
    })
  },
  isEmailCorrect (email) {
    if (/([\w-\\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g.test(email)) {
      return true
    }
    return false
  },
  isPasswordFull (password) {
    if (password !== '') {
      return true
    }
    return false
  },
  clearForm () {
    this.email = ''
    this.password = ''
  }
}
