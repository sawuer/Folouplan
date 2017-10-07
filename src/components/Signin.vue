<template>
  <transition enter-active-class="animated fadeIn">
    <div>
    <h5 class="light-text">Sign in</h5>
    <v-container fluid class="text-xs-center">
      <v-layout row wrap>
          <v-card height="185px" class="elevation-0 white">
            <form @submit.prevent="onSignin">
              <v-text-field
                name="email"
                id="email"
                label="E-mail"
                v-model="email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                name="password"
                label="Password"
                v-model="password"
                id="password"
                type="password"
                required
              ></v-text-field>      
              <v-btn 
                type="submit" 
                >Sign in</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>  
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Auth',
    computed: {
      user: () => this.$store.getters.user
    },
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {
          email: this.email,
          password: this.password
        }).then(i => {
          setTimeout(() => {
            if (this.$store.getters.user !== null) {
              this.$router.push('/todolist')
            } else {
              this.$router.push('/signin')
            }
          }, 1500)
        })
      },
      clear () {
        this.email = ''
        this.password = ''
      }
    }
  }
</script>