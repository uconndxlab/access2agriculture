<template>
  <v-app>
    <v-main>
      <router-view/>
      <bottom-navigation></bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import BottomNavigation from '@/components/BottomNavigation.vue'

export default {
  name: 'App',
  components: {
    BottomNavigation
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchWaypoints', 'fetchAssistanceOptions'])
  },
  created() {
    this.fetchProducts()
    this.fetchWaypoints()
    this.fetchAssistanceOptions()
  }
}
</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
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

<style lang="css">

#app{
  font-family: 'Kanit', sans-serif;
}

.v-application .display-1{
  color: #000;
  text-align: left;
  font-family: 'Kanit', sans-serif!important;
}

.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle{
  text-align: left;
}

.v-application .subtitle-1{
  text-align: left;
  font-size: 18px!important;
  font-family: 'Kanit', sans-serif!important;
}

.v-chip .v-chip__content{
  font-weight: 500;
  text-transform: uppercase;
}

.v-chip.v-chip--outlined.v-chip.v-chip{
  border-color: #000;
}

span.v-chip.v-slide-item--active.v-chip--active.v-chip--clickable.v-chip--no-color.v-chip--outlined.theme--light.v-size--default {
    background-color: black!important;
    color: white;
}

.v-card.map-item{
  width: 100%;
}

a.v-btn--active.v-btn--active.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--router.theme--light.v-size--default.white{
  background-color:white!important;
}

.v-item-group.v-bottom-navigation--fixed a.v-btn--active.v-btn--active.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--router.theme--light.v-size--default.white .v-btn__content{
  border-top: 2px solid black;
}

.theme--light.v-bottom-navigation .v-btn:not(.v-btn--active){
  color: #9E9E9E!important;
}

.v-btn__content{
  width:100%
}

.v-application #mapContainer h3{
  margin-bottom: 3px;
  font-family: 'Kanit', sans-serif!important;
  text-align: left;
}

.v-application #mapContainer p{
  margin-bottom: 0px;
  font-family: 'Kanit', sans-serif!important;
  line-height: 16px;
  text-align: left;
}

#mapContainer .mapboxgl-popup-close-button{
  right: 7px;
  font-size: 20px;
}

#mapContainer .mapboxgl-popup-content{
    padding: 20px 25px;
}
</style>
