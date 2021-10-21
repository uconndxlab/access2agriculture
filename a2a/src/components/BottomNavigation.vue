<template>
  <v-bottom-navigation grow app v-model="activeNav">
    <v-btn
      v-for="nav in navItems"
      :key="`bnav-${nav.value}`"
      color="white"
      :to="nav.to"
      :value="nav.value">
      <span>{{ nav.text }}</span>

      <v-icon>{{ nav.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavigation",
  data: () => {
    return {
      activeNav: '',
      navItems: [
        {
          to: '/',
          value: 'map',
          icon: 'mdi-map',
          text: 'Map'
        },
        {
          to: '/map-list',
          value: 'map-list',
          icon: 'mdi-format-list-bulleted',
          text: 'List'
        },
        {
          to: '/liked',
          value: 'liked',
          icon: 'mdi-bookmark',
          text: 'Saved'
        },
        {
          to: '/settings',
          value: 'settings',
          icon: 'mdi-cog',
          text: 'Settings'
        }
      ]
    }
  },
  computed: {
    isMapRoute() {
      return this.$route.path.startsWith('/map-item') || this.$route.path === '/' 
    }
  },
  created() {
    if ( this.isMapRoute ) {
      this.activeNav = 'map'
    } else {
      const existingNav = this.navItems.find(x => x.to === this.$route.path)
      if ( existingNav && existingNav.value ) {
        this.activeNav = existingNav.value
      }
    }
  }
}
</script>