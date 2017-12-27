export default function () {
  if (!this.emailValidate() || !this.passwordValidate()) {
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
