<template>
  <transition enter-active-class="animated fadeIn">
    <div>
    <h5 class="light-text">Sign in</h5>
    <v-container fluid class="text-xs-center">
      <v-layout row wrap>
          <v-card height="185px" class="elevation-0 white">
            <form @submit.prevent="onSignup">
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

              <v-text-field
                name="confirmPassword"
                label="Confirm password"
                v-model="confirmPassword"
                id="confirmPassword"
                type="password"
                required
                :rules="[comparePasswords]"
              ></v-text-field>   
              
              <v-btn 
                type="submit" 
                >Sign up</v-btn>
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
    updated () {
      console.log(this.$store.state.user)
    },
    mounted () {
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Password do not match' : true
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (val) {
        if (val !== null && val !== undefined) {
          this.$router.push('/todo')
        } else {
          this.$router.push('/auth')
        }
      }
    },
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {
          email: this.email,
          password: this.password
        })
        console.log(this.$root)
        console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
      },
      clear () {
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
      }
    }
  }
</script>