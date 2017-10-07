<template>
  <div>
    <v-layout row wrap>
      <template v-if="this.$store.getters.user !== null">
        <v-flex xs12>
          <span class="floatR">
            <v-menu
              transition="slide-y-transition"
              >
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                {{ $store.getters.user.email }}
                <v-list-tile v-for="item in emailDropdown" :key="item.title" @click="">
                  <v-list-tile-title>
                    <span @click="logOut">{{ item.title }}</span>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </span>
        </v-flex>    
      </template>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        emailDropdown: [{ title: 'Logout' }]
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