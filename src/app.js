import navigation from './components/navigation/navigation'

export default {
  name: 'app',
  template: `
    <div>
      <div v-if="!loaded">
        <v-progress-circular 
          id="main-preloader" 
          indeterminate 
          v-bind:size="70" 
          v-bind:width="7" 
          class="deep-orange--text"
          ></v-progress-circular>
      </div>
      <div v-else>
        <div id="app">
          <navigation></navigation>
        </div>
      </div>
    </div>
  `,
  components: {
    navigation
  },
  mounted () {
    var self = this
    setTimeout(() => {
      self.loaded = true
    }, 1500)
  },
  data () {
    return {
      loaded: false
    }
  }
}
