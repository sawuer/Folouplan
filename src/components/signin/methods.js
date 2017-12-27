export default {
  isEmailFull (email) {
    if (email !== '') {
      return true
    }
    return false
  },
  isEmailCorrect (email) {
    if (/([\w-\\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g.test(email)) {
      return true
    }
    return false
  },
  clearForm () {
    this.email = ''
    this.password = ''
  },
  onSignin () {
    if (this.isEmailFull(this.email)) {
      this.validFull.email = false
    } else {
      this.validFull.email = true
      return
    }
    if (this.isEmailCorrect(this.email)) {
      this.validCorrect.email = false
    } else {
      this.validCorrect.email = true
      return
    }

    this.signUserIn({
      email: this.email,
      password: this.password
    }).then(_ => {
      setTimeout(_ => {
        if (this.user !== null) {
          this.$router.push('/money')
        } else {
          this.$router.push('/signin')
        }
      }, 1500)
    })
  }
}
