<template>
  <div>
    Hello, <span class="user-name">{{userName}}!</span>
    <v-btn icon>
      <router-link to="/configs"><v-icon>more_vert</v-icon></router-link>
      
    </v-btn>
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