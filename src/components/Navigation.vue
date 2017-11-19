<template>
  <v-app id="navigation" toolbar>
    <v-navigation-drawer permanent floating light>
      <v-list dense class="pt-0">
        <v-list-tile @click="clickOnNavItem" router-link :to=item.path v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="elevation-0 deep-orange darken-2" dark>
      <v-flex xs9>
        <v-layout row wrap>
          <v-toolbar-title style="font-family: 'Raleway', sans-serif;">
            <div style="float: left;"><b>Follouplan</b></div>
           <!-- <div style="font-size: 12px; float: left; padding-right: 12px; font-weigth: lighter; transform: translate(12px, 8px);">your life under control</div> -->
          </v-toolbar-title>
        </v-layout>
      </v-flex>  
      <v-flex xs3>
        <User></User>
      </v-flex>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>


<script>
  import User from '@/components/User'
  export default {
    name: 'navigation',
    components: { User },
    mounted () {
      this.clickOnNavItem()
    },
    methods: {
      clickOnNavItem () {
        this.$store.dispatch('setURL')
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { title: 'Sign up', path: '/signup', icon: 'face' },
          { title: 'Sign in', path: '/signin', icon: 'lock_on' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { title: 'Targets', path: '/targets', icon: 'storage' },
            { title: 'Money', path: '/money', icon: 'attach_money' }
            // { title: 'Notes', path: '/notes', icon: 'book' }
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>