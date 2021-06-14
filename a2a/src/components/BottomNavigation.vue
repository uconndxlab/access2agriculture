<template>
  <v-bottom-navigation grow app>
    <v-btn
        color="white"
        value="map"
        to="/map">
      <span>Map</span>

      <v-icon>mdi-map</v-icon>
    </v-btn>

    <v-btn 
        color="white"
        value="liked"
        to="/liked">
      <span>Liked</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn
        color="white"
        value="notifications"
        to="/notifications">
      <span>Notifications</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>

    <v-btn
        color="white"
        value="account"
        to="/account">
      <span>Account</span>

      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>