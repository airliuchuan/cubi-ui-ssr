<template>
  <div id="app">
    <router-view/>
    <div id="loading" v-show="isLoadingShow">
      <loading/>
    </div>
  </div>
</template>

<script>
import Loading from './components/loading/loading.vue'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState(['isLoadingShow'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 600px;
  margin: 0 auto;
}
#loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
