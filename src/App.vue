<template>
  <div>
    <div v-if="!loaded">
      <v-progress-circular id="main-preloader" indeterminate v-bind:size="70" v-bind:width="7" class="purple--text lighten-1--text"></v-progress-circular>
    </div>
    <div v-else>
      <div id="app">
        <navigation></navigation>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  export default {
    name: 'app',
    components: {
      Navigation
    },
    mounted () {
      var self = this
      setTimeout(function () {
        self.loaded = true
      }, 2000)
    },
    data () {
      return {
        loaded: false
      }
    }
  }
</script>

<style>

</style>
