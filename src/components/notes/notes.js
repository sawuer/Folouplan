import { mapGetters } from 'vuex'
import template from './notes.html'

export default {
  template,
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data () {
    return {
      post: '',
      valid: false,
      textRules: [
        (v) => !!v || 'You didn\'t fill out the field'
      ]
    }
  },
  methods: {
    addPost () {
      var text = this.$refs.form.$el[0].value
      var today = new Date()
      var dateString = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear()
      if (text !== '') {
        this.$root.$firebaseRefs.users
          .child(this.user)
          .child('data')
          .child('posts').push({
            text: text,
            date: dateString,
            dialog: false
          })
      }
    },
    deletePost (key) {
      console.log(key)
      this.$root.$firebaseRefs.users
        .child(this.user)
        .child('data')
        .child('posts')
        .child(key).remove()
    }
  }
}