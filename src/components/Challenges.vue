<template>
	<div>
      <h5 class="light-text">Challenges</h5>
		  <v-progress-linear v-model="valueDeterminate"></v-progress-linear>
	</div>
     
</template>

<script>
  export default {
    name: 'Challenges',
    mounted () {
      this.counter()
    },
    data () {
      return {
        valueDeterminate: 0
      }
    },
    methods: {
      counter () {
        var self = this
        setInterval(function () {
          self.valueDeterminate += 0.5
        }, 50)
      }
    }
  }
</script>

