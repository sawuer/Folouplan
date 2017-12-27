import emailValidate from './methods/emailValidate.js'
import onSignin from './methods/onSignin.js'

export default {
  emailValidate,
  onSignin,
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
  },
  passwordValidate () {
    if (this.isPasswordFull(this.password)) {
      this.validFull.password = false
    } else {
      this.validFull.password = true
      return false
    }
    return true
  }
}
