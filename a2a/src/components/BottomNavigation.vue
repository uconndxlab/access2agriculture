<template>
  <v-bottom-navigation grow app>
    <v-btn
        color="white"
        to="/">
      <span>Map</span>

      <v-icon>mdi-map</v-icon>
    </v-btn>

    <v-btn 
        color="white"
        to="/map-list">
      <span>List</span>

      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>

    <v-btn
        color="white"
        to="/liked">
      <span>Saved</span>

      <v-icon>mdi-bookmark</v-icon>
    </v-btn>

    <v-btn
        color="white"
        to="/settings">
      <span>Settings</span>

      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavigation"
}
</script>