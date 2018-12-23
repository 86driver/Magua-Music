<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-player></v-player>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header.vue'
  import VTab from 'components/v-tab/v-tab.vue'
  import VPlayer from 'components/v-player/v-player.vue'

  export default {
    name: 'App',
    components: {
      'v-header': VHeader,
      'v-tab': VTab,
      'v-player': VPlayer
    },
    methods: {
      goHome() {
        this.$router.push('/recommend')
      }
    }
  }
</script>

<style>
</style>
