export default function () {
  if (this.isPasswordFull(this.password)) {
    this.validFull.password = false
  } else {
    this.validFull.password = true
    return false
  }
  return true
}
