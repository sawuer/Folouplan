<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-flex xs12 sm8>
        <v-text-field id="todo"
          label="Todo"
          v-model="todo"
          :rules="nameRules"
          :counter="50"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3>
        <v-dialog
          persistent
          v-model="modal"
          lazy
          color="green--title"
          full-width
        >
          <v-text-field
            slot="activator"
            label="Picker in dialog"
            v-model="e3"
            readonly
          ></v-text-field>
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

      <v-btn class="green lighten-1 white-text" @click="submit">
        Add todo
      </v-btn>
      <v-btn @click="clear">Clear</v-btn>
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
        menu: false,
        modal: false,
        msg: 'Todolist',
        todos: [
          {
            title: 'Купить продукты в магазине',
            date: '2017-09-09',
            ex: false
          },
          {
            title: 'Создать программу на Vue.js',
            date: '2017-09-09',
            ex: false
          }
        ],
        valid: false,
        nameRules: [
          (v) => !!v || 'Todo is required',
          (v) => v && v.length <= 50 || 'Todo must be less than 50 characters'
        ]
      }
    },
    methods: {
      submit () {
        this.$refs.form.validate()
        var todo = this.$refs.form.$el[0].value
        console.log(this.$refs.form.$el)
        var date = this.$refs.form.$el[1].value
        this.todos.push({
          title: todo,
          date: date,
          ex: false
        })
      },
      clear () {
        this.$refs.form.reset()
      }
    }

  }
</script>

