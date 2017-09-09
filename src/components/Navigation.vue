<template>
  <v-app id="navigation" toolbar>
    <v-navigation-drawer permanent floating light>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to=item.path>{{ item.title }}</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="purple lighten-1" dark>
      <v-flex xs9>
        <v-toolbar-title>{{appName}}<!--  &mdash; {{tagLine}} --></v-toolbar-title>
      </v-flex>  
      <v-flex xs3>
        <user></user>
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
    components: {
      User
    },
    data () {
      return {
        appName: 'Ramona',
        tagLine: 'your life under control',
        items: [
          { title: 'Todolist', path: '/todolist', icon: 'storage' },
          { title: 'Mindmaps', path: '/mindmaps', icon: 'device_hub' },
          { title: 'Money', path: '/money', icon: 'attach_money' },
          { title: 'Diary', path: '/diary', icon: 'book' },
          { title: 'Challenges', path: '/challenges', icon: 'flash_on' }
        ]
      }
    }
  }
</script>