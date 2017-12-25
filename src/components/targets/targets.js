import { mapGetters } from 'vuex'
import template from './targets.html'

export default {
  template,
  name: 'Todo',
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data () {
    return {
      deleteTodos: '#completedTodos',
      todo: null,
      datePicker: null,
      currenEdit: null,
      modalDate: false,
      todoFormValid: false,
      nameRules: [
        (v) => !!v || 'You didn\'t fill out the field',
        (v) => v && v.length <= 100 || 'Todo must be less than 100 characters'
      ]
    }
  },
  mounted () {
    this.reverseDeleteTodos()
  },
  methods: {
    completedTodosDiv: it => document.querySelector(it),
    reverseDeleteTodos () {
      var deleteTodos = this.completedTodosDiv(this.deleteTodos)
      setTimeout(() => {
        let deleteList = Array.prototype.slice.call(deleteTodos.childNodes)
        for (let i = deleteList.length - 1; i >= 0; i--) {
          deleteTodos.appendChild(deleteList[i])
        }
      }, 200)
    },
    addTodo () {
      this.$refs.todoForm.validate()
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data')
        .child('todos').push({
          title: this.$refs.todoForm.$el[0].value,
          date: this.$refs.todoForm.$el[1].value,
          ex: false
        })
    },
    doneTodo (todo, key) {
      var update = {
        title: todo.title,
        date: todo.date
      }
      update.ex = !todo.ex ? Boolean(true) : false
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data').child('todos')
        .child(key).update(update)
    },
    deleteTodo (todo, key) {
      if (todo.ex) {
        this.$root.$firebaseRefs.users
          .child(this.user.key)
          .child('data').child('doneTodos').push({
            title: todo.title,
            date: todo.date
          })
        let deleteTodos = this.completedTodosDiv(this.deleteTodos)
        setTimeout(() => {
          var els = deleteTodos.lastChild
          deleteTodos.prepend(els)
        }, 20)
      }
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data')
        .child('todos')
        .child(key).remove()
    },
    undoComplete (todo, key) {
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data').child('todos').push({
          title: todo.title,
          date: todo.date,
          ex: false
        })
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data')
        .child('doneTodos')
        .child(key).remove()
    },
    newTodoTitle (e, todo, key) {
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data')
        .child('todos')
        .child(key).update({
          title: e.target.value
        })
    },
    clearAllList (data) {
      this.$root.$firebaseRefs.users
        .child(this.user.key)
        .child('data')
        .child(data).remove()
    },
    clearTodoList () {
      this.clearAllList('todos')
    },
    clearDeleteList () {
      this.clearAllList('doneTodos')
    }
  }
}
