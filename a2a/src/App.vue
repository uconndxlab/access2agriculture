<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <bottom-navigation/>
  </v-app>
</template>

<script>
import BottomNavigation from '@/components/BottomNavigation.vue'

export default {
  name: 'App',
  components: {
    BottomNavigation
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>
