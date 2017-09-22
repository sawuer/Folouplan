<template>
  <div>
    <v-layout row wrap>
      <template v-if="this.$store.getters.user !== null">
        <v-flex xs9>
          <span class="floatR user-wrapper">
            <span class="user-name">{{currentUserEmail}}</span>
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
        currentUserEmail: Firebase.auth().currentUser.email
      }
    }
  }
</script>