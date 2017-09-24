<template>
 	<v-alert error dismissible @input="onClose" :value="true">
    This is a success alert that is closable.
  </v-alert>
</template>

<script>
  export default {
    name: 'navigation',
    components: {
    },
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    },
    data () {
      return {
      }
    }
  }
</script>


