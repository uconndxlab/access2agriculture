<template>
  <v-app-bar
    color="white"
  >
    <v-icon></v-icon>
    <v-toolbar-title>Access2Ag</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn elevation="0" color="white" @click="openFilter()" class="vert-btn mr-2" v-if="!toPage">
      <v-icon color="black">mdi-filter-variant</v-icon>
      Filter
    </v-btn>
    <v-btn elevation="0" color="white" @click="openNearMe()" class="vert-btn">
      <v-icon color="black">mdi-navigation-variant</v-icon>
      Near Me
    </v-btn>
  </v-app-bar>
</template>

<script>

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
          return this.$route.path === '/'
      }
  },
  methods: {
    openFilter() {
      this.$emit('topNavOpenFilter')
    },
    openNearMe() {
      this.$emit('topNavOpenFilter')
    }
  }
};
</script>

<style lang="scss">
.vert-btn {
  padding-top: 8px;
  padding-bottom: 8px;
  .v-btn__content {
    flex-direction: column;
  }
}
</style>