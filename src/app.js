import navigation from './components/navigation/navigation'
import preloader from './components/preloader/preloader'

export default {
  name: 'app',
  template: `
    <div>
      <div v-if="!loaded">
        <preloader></preloader>
      </div>
      <div v-else>
        <navigation></navigation>
        <div class="_page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  `,
  components: {
    navigation,
    preloader
  },
  mounted () {
    var self = this
    setTimeout(() => {
      self.loaded = true
    }, 2000)
  },
  data () {
    return {
      loaded: false
    }
  }
}
