<template>
  <v-container class="pt-9">
    <v-row align="center" justify="space-around">
      <v-col>
        <v-btn-toggle rounded>
          <v-btn v-if="isRootMapRoute" elevation="3" color="white" to="/map-list">
            <v-icon color="black">mdi-format-list-bulleted</v-icon>
          </v-btn>
          <v-btn v-if="!isRootMapRoute" elevation="3" color="white" value="map" to="/">
            <v-icon color="black">mdi-map</v-icon>
          </v-btn>
          <v-btn elevation="3" color="white" value="filter" to="/filter">
            <v-icon color="black">mdi-filter-variant</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col>
        <v-btn-toggle rounded>
          <v-btn elevation="3" color="white" to="/liked">
            <v-icon color="black">mdi-bookmark</v-icon>
          </v-btn>
          <v-btn elevation="3" color="white">
            <v-icon color="black">mdi-cog</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  name: "TopButtonNavigation",
  computed: {
      isRootMapRoute() {
          return router.currentRoute.path === '/'
      }
  }
};
</script>