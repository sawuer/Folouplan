<template>
  <transition enter-active-class="animated fadeIn">

  <div>
    <h5 class="light-text">Add todo</h5>
    
    <v-form transition="fade-transition" v-model="valid" ref="form">
        <v-flex xs5>
          <v-text-field id="todo" label="Todo" v-model="todo" :rules="nameRules" :counter="50" required></v-text-field>
        </v-flex>
        <v-flex xs5>
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
        </v-flex>
      <v-btn class="green lighten-2 white-text" @click="submit">Add todo</v-btn>
    </v-form>
    <br>
    <br>
    <v-layout row>
      <v-flex xs12>
          <v-list two-line>
            <template v-for="todo in todos">
              <!-- {{todo.ex}} -->
              <v-subheader v-if="todo.header" v-text="todo.header"></v-subheader>
              <v-divider v-else-if="todo.divider" v-bind:inset="todo.inset"></v-divider>
              <v-list-tile avatar v-else v-bind:key="todo.title" download>
                <v-list-tile-action>
                  <v-checkbox append-icon light v-bind:label="null" v-model="todo.ex" color="green lighten-2" light></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-html="todo.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="todo.date"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-btn class="delete-todo completed-todos" @click="deleteTodo(todo)" icon>
                  <v-icon class="grey--text">delete</v-icon>
                </v-btn>
              </v-list-tile>
            </template>
          </v-list>
      </v-flex>
    </v-layout>
    <br>
    <h5 class="light-text">Completed</h5>
    <v-layout row>
      <v-flex xs12>
          <v-list two-line>
            <template v-for="item in completedTodos">
              <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
              <v-list-tile avatar v-else v-bind:key="item.title" download>
                <v-list-tile-content class="completed-todos">
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.date"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
      </v-flex>
    </v-layout>
  </div>
  </transition>

</template>

<script>
  import Firebase from 'firebase'
  let config = {
    apiKey: 'AIzaSyAmplgxIdyy9lxh2Pj1Z1CCqmnShxpCX_k',
    authDomain: 'ramona-6e161.firebaseapp.com',
    databaseURL: 'https://ramona-6e161.firebaseio.com',
    projectId: 'ramona-6e161',
    storageBucket: 'ramona-6e161.appspot.com',
    messagingSenderId: '73956155263'
  }
  let app = Firebase.initializeApp(config)
  let db = app.database()
  let todosRef = db.ref('todos')
  export default {
    name: 'Todo',
    firebase: {
      todos: todosRef
    },
    data () {
      return {
        todo: '',
        datePicker: null,
        modalDate: false,
        valid: false,
        nameRules: [
          (v) => !!v || 'You didn\'t fill out the field',
          (v) => v && v.length <= 50 || 'Todo must be less than 50 characters'
        ],

        completedTodos: [
          { title: 'Купить слона', date: '2017-09-09', ex: false },
          { title: 'Продать слона', date: '2017-09-09', ex: false },
          { title: 'Развести котят', date: '2017-09-09', ex: false }
        ]
      }
    },
    methods: {
      submit () {
        console.log(todosRef)
        this.$refs.form.validate()
        var todo = this.$refs.form.$el[0].value
        var date = this.$refs.form.$el[1].value
        if (todo !== '') {
          todosRef.push({
            title: todo,
            date: date,
            ex: false
          })
        }
      },
      doneTodo () {},
      deleteTodo (todo) {
        // console.log(todo.target.parentElement.parentElement)
        // console.log(todosRef.child(todo['.key']))
        // console.log(todo)
        todosRef.child(todo['.key']).remove()
        // var parent = event.target.parentElement.parentElement
        // var title = parent.querySelector('.list__tile__title').innerHTML
        // var todosLength = Object.keys(this.todos).length
        // for (var i = 0; i < todosLength; i++) {
        //   console.log(title)
        //   if (title === this.todos[i].title) {
        //     if (this.todos[i].ex === true) {
        //       this.completedTodos.unshift(this.todos.splice(i, 1)[0])
        //       return
        //     }
        //     console.log(i)
        //     todosRef.remove(i)
        //   }
        // }
      }
    }

  }
</script>

