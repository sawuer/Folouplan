import navigation from './components/navigation/navigation'

export default {
  name: 'app',
  components: {
    navigation
  },
  template: `
    <div>
      <div v-if="!loaded">
        <v-progress-circular 
          id="main-preloader" 
          indeterminate 
          v-bind:size="70" 
          v-bind:width="7" 
          class="light-green--text"
          ></v-progress-circular>
      </div>
      <div v-else>
        <div id="app">
          <navigation></navigation>
        </div>
      </div>
    </div>
  `,
  mounted () {
    setTimeout(() => {
      this.loaded = true
    }, 3000)
  },
  data () {
    return {
      loaded: false
    }
  }
}
