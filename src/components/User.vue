<template>
  <div>
    
    <v-layout row wrap>
      <v-flex xs9>
        <span class="floatR user-wrapper">
          Hello, <span class="user-name">{{userName}}!</span>
        </span>
      </v-flex>    
      <v-flex xs3>
        <router-link class="floatR" to="/configs">
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </router-link>
      </v-flex>
    </v-layout>

      
    
  </div>
</template>

<script>
  export default {
    name: 'user',

    data () {
      return {
        userName: 'sowyer'
      }
    },
    methods: {
    }

  }
</script>