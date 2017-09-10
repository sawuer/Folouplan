<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field id="todo" label="Todo" v-model="todo" :rules="nameRules" :counter="50" required></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-dialog persistent v-model="modalDate" lazy color="green--title" full-width>
            <v-text-field slot="activator" label="Date" v-model="e3" readonly></v-text-field>
            <v-date-picker v-model="e3" scrollable >
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-btn class="purple lighten-2 white-text" @click="submit">Add todo</v-btn>
      <v-btn class="grey--text" @click="clear">Clear</v-btn>
    </v-form>
    <br>
    <v-layout row>
      <v-flex xs12>
          <v-list two-line>
            <template v-for="item in todos">
              <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
              <v-list-tile avatar v-else v-bind:key="item.title" @click="" download>
                <v-list-tile-action>
                  <v-checkbox v-bind:label="null" v-model="item.ex" color="green lighten-1" light></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.date"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-btn class="delete-todo" @click="deleteTodo" icon>
                  <v-icon class="grey--text">delete</v-icon>
                </v-btn>
              </v-list-tile>
            </template>
          </v-list>
      </v-flex>
    </v-layout>
    <br>
    <br>
    <h5>Completed</h5>
    <v-layout row>
      <v-flex xs12>
          <v-list two-line>
            <template v-for="item in completedTodos">
              <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
              <v-list-tile avatar v-else v-bind:key="item.title" @click="" download>
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
</template>

<script>
  export default {
    name: 'Todo',
    data () {
      return {
        todo: '',
        e3: null,
        modalDate: false,
        valid: false,
        nameRules: [
          (v) => !!v || 'Todo is required',
          (v) => v && v.length <= 50 || 'Todo must be less than 50 characters'
        ],

        todos: [
          {
            title: '1Купить продукты в магазине',
            date: '2017-09-09',
            ex: false
          },
          {
            title: '2Создать программу на Vue.js',
            date: '2017-09-09',
            ex: false
          },
          {
            title: '3Создать программу на Vue.js',
            date: '2017-09-09',
            ex: false
          },
          {
            title: '4Создать программу на Vue.js',
            date: '2017-09-09',
            ex: false
          }
        ],

        completedTodos: [
        ]
      }
    },
    methods: {
      submit () {
        this.$refs.form.validate()
        var todo = this.$refs.form.$el[0].value
        var date = this.$refs.form.$el[1].value
        if (todo !== '') {
          this.todos.push({
            title: todo,
            date: date,
            ex: false
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      deleteTodo (event) {
        var parent = event.target.parentElement.parentElement
        var title = parent.querySelector('.list__tile__title').innerHTML
        var todosLength = Object.keys(this.todos).length
        for (var i = 0; i < todosLength; i++) {
          if (title === this.todos[i].title) {
            if (this.todos[i].ex === true) {
              this.completedTodos.unshift(this.todos.splice(i, 1)[0])
              return
            }
            this.todos.splice(i, 1)[0]
          }
        }
      }
    }

  }
</script>

