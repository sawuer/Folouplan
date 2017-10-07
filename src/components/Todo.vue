<template>
  <transition enter-active-class="animated fadeIn">
    <v-container fluid grid-list-md>

      <v-layout row wrap>
        <v-flex xs8 class="pa-3">
            <v-list>
              <template v-for="user in this.$root.users">
                <template v-if="user.id === $store.getters.user.id">
                  <template v-if="user.data">
                    <template v-for="(todo, key, index) in user.data.todos">
                      <v-list-tile avatar v-bind:key="todo.title">
                        <v-list-tile-action>
                          <v-checkbox append-icon light v-bind:label="null" @click="doneTodo(todo, key)" v-model="todo.ex" color="green lighten-2" light></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <span class="text--grey">{{+index + 1}}.</span>
                            <v-edit-dialog> 
                              {{ todo.title }}
                              <v-text-field
                                slot="input"
                                @keyup.enter="newTodoTitle($event, todo, key)"
                                :value="todo.title"
                              ></v-text-field>
                            </v-edit-dialog>
                          </v-list-tile-title>
                          <v-list-tile-sub-title v-html="todo.date"></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-btn class="delete-todo completed-todos" @click="deleteTodo(todo, key)" icon>
                          <v-icon class="text--grey lighten-1">delete</v-icon>
                        </v-btn>
                      </v-list-tile>
                    </template>
                  </template>
                </template>
              </template>
            </v-list>
          <br>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon>delete_forever</v-icon>
                <template v-for="user in this.$root.users">
                    <span v-if="user.id === $store.getters.user.id">
                    <template v-if="user.data">
                      {{ user.data.doneTodos ? Object.keys(user.data.doneTodos).length : 0}}
                    </template>
                  </span>
                </template>
              </div>
              <v-list id="completedTodos">
                <template v-for="user in this.$root.users">
                  <span v-if="user.id === $store.getters.user.id">
                    <template v-if="user.data">
                      <template v-for="(todo, key) in user.data.doneTodos">
                        <v-list-tile class="completed-todos" avatar v-bind:key="todo.title" download>   
                          <v-list-tile-content>
                            <v-list-tile-title>
                              {{todo.title}}
                            </v-list-tile-title>
                            <v-list-tile-sub-title v-html="todo.date"></v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-btn class="delete-todo completed-todos" @click="undoComplete(todo, key)" icon>
                            <v-icon class="text--grey lighten-1">undo</v-icon>
                          </v-btn>
                        </v-list-tile>
                      </template>
                    </template>
                  </span>
                </template>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>  
        </v-flex>
        <v-flex xs4>
          <v-container fluid grid-list-md class="pa-3">
            <v-layout row wrap>
              <v-flex>
                <v-form transition="fade-transition" v-model="todoFormValid" ref="todoForm">
                  <v-text-field id="todo" label="Todo" v-model="todo" :rules="nameRules" :counter="50" required></v-text-field>
                  <v-dialog persistent v-model="modalDate" lazy color="green--title" full-width>
                    <v-text-field slot="activator" label="Date" v-model="datePicker" readonly></v-text-field>
                    <v-date-picker v-model="datePicker" autosave year-icon scrollables>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                  <v-btn icon class="grey lighten-4 green--text" @click="addTodo">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
          <v-layout row wrap>
            <v-flex>
              <v-btn error @click="clearTodoList" dark>Clear all todos</v-btn>
              <v-btn error @click="clearDeleteList" dark>Clear all completed</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </transition>
</template>

<script>
  export default {
    name: 'Todo',
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
          (v) => v && v.length <= 50 || 'Todo must be less than 50 characters'
        ]
      }
    },
    updated () {
      console.table({
        'User': this.$store.getters.user,
        'Users': this.$store.getters.usersInFirebase,
        'newUserId': this.$store.getters.newUserId
      })
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
        var todo = this.$refs.todoForm.$el[0].value
        var date = this.$refs.todoForm.$el[1].value
        this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
          .child('data').child('todos').push({
            title: todo,
            date: date,
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
          .child(this.$store.getters.user.key)
          .child('data').child('todos')
          .child(key).update(update)
      },

      deleteTodo (todo, key) {
        if (todo.ex) {
          this.$root.$firebaseRefs.users
            .child(this.$store.getters.user.key)
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
          .child(this.$store.getters.user.key)
          .child('data')
          .child('todos')
          .child(key).remove()
      },

      undoComplete (todo, key) {
        this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
          .child('data').child('todos').push({
            title: todo.title,
            date: todo.date,
            ex: false
          })
        this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
          .child('data')
          .child('doneTodos')
          .child(key).remove()
      },

      newTodoTitle (e, todo, key) {
        this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
          .child('data')
          .child('todos')
          .child(key).update({
            title: e.target.value,
            date: todo.date,
            ex: todo.ex
          })
      },

      clearAllList (data) {
        this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
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
</script>