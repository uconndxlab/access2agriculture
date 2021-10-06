<template>
  <v-container class="pt-9">
    <v-row align="center" justify="space-around">
      <v-col>
        <v-btn-toggle rounded>
          <v-btn v-if="isRootMapRoute" elevation="3" color="white" to="/map-list">
            <v-icon color="black">mdi-format-list-bulleted</v-icon>
          </v-btn>
          <v-btn v-if="!isRootMapRoute" elevation="3" color="white" to="/">
            <v-icon color="black">mdi-map</v-icon>
          </v-btn>
          <v-btn elevation="3" color="white" @click="openFilter()" v-if="!toPage">
            <v-icon color="black">mdi-filter-variant</v-icon>
          </v-btn>
          <v-btn elevation="3" color="white" to="/filter" v-else>
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
  props: {
    toPage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
      isRootMapRoute() {
          return router.currentRoute.path === '/'
      }
  },
  methods: {
    openFilter() {
      this.$emit('topNavOpenFilter')
    }
  }
};
</script>