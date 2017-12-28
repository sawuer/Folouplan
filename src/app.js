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
    setTimeout(() => {
      this.loaded = true
    }, 1500)
  },
  data () {
    return {
      loaded: false
    }
  }
}
