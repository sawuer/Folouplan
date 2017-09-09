<template>
  <div v-if="start">
   <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
    <div id="app">
      <navigation></navigation>
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
    data () {
      return {
        start: true
      }
    }
  }
</script>

<style>

</style>
