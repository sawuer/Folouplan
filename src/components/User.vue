<template>
  <div>
    <v-layout row wrap>
      <template v-if="this.$store.getters.user !== null">
        <v-flex xs9>
          <span class="floatR user-wrapper">

    

            <v-menu
              transition="slide-y-transition"
              bottom
            >
              <span slot="activator" class="user-name">{{currentUserEmail}}</span>

              <v-list>
                <v-list-tile v-for="item in emailDropdown" :key="item.title" @click="">
                  <v-list-tile-title>
                    <span @click="logOut">{{ item.title }}</span>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </span>
        </v-flex>    
        <v-flex xs3>
          <router-link class="floatR" to="/configs">
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </router-link>
        </v-flex>
      </template>
    </v-layout>
  </div>
</template>

<script>
  import * as Firebase from 'firebase'
  export default {
    name: 'user',
    data () {
      return {
        currentUserEmail: Firebase.auth().currentUser.email,
        emailDropdown: [
          {
            title: 'Logout'
          }
        ]
      }
    },
    methods: {
      logOut () {
        this.$store.dispatch('logOut')
        this.$router.push('/signin')
      }
    }
  }
</script>