<template>
  <v-bottom-navigation grow app :value="activeRoute">
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
            navItems: [
                {
                    to: '/map',
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
        activeRoute() {
            if ( this.$route.path.startsWith('/liked') ) {
                return 'liked'
            }
            if ( this.$route.path.startsWith('/settings') ) {
                return 'settings'
            }
            if ( this.$route.path.startsWith('/map-list') ) {
                return 'map-list'
            }
            return 'map'
        }
    }
}
</script>