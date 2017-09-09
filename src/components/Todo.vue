<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-text-field id="todo"
        label="Todo"
        v-model="todo"
        :rules="nameRules"
        :counter="50"
        required
      ></v-text-field>
      <v-text-field
        label="Description"
      ></v-text-field>

      <v-btn class="green lighten-1" @click="submit">
        <v-icon class="white-text">add</v-icon>
      </v-btn>
      <v-btn @click="clear">Clear</v-btn>
    </v-form>

    <br>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <template v-for="item in todos">
              <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
              <v-list-tile avatar v-else v-bind:key="item.title" @click="" download>
                <v-list-tile-avatar>
                 df
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.date"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
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
        msg: 'Todolist',
        todos: [
          {
            title: 'Item 1',
            date: '23'
          },
          {
            title: 'Item 1',
            date: '23'
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
        var desc = this.$refs.form.$el[1].value
        this.todos.push({
          title: todo,
          date: desc
        })
      },
      clear () {
        this.$refs.form.reset()
      }
    }

  }
</script>

