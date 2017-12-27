export default function () {
  if (this.isEmailFull(this.email)) {
    this.validFull.email = false
  } else {
    this.validFull.email = true
    return false
  }
  if (this.isEmailCorrect(this.email)) {
    this.validCorrect.email = false
  } else {
    this.validCorrect.email = true
    return false
  }
  return true
}
