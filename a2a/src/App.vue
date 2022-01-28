<template>
  <v-app>
    <v-main>
      <router-view/>
      <bottom-navigation v-if="!isRoot"></bottom-navigation>
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
    computed: {
        isRoot() {
            return this.$route.path == '/'
        }
    },
    methods: {
        ...mapActions(['fetchProducts', 'fetchWaypoints', 'fetchAssistanceOptions', 'fetchRoutes'])
    },
    created() {
        this.fetchProducts()
        this.fetchWaypoints()
        this.fetchAssistanceOptions()
        this.fetchRoutes()
    }
}
</script>


<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}

.theme--light.v-bottom-navigation .v-btn:not(.v-btn--active){
  color: rgba($a2a-darkgreen, 0.5) !important;
}

span.v-chip.v-slide-item--active.v-chip--active.v-chip--clickable.v-chip--no-color.v-chip--outlined.theme--light.v-size--default {
    background-color: $a2a-green!important;
    color: white;
}

.v-chip.v-chip--outlined.v-chip.v-chip{
  border-color: $a2a-darkgreen;
}
</style>

<style lang="css">
.v-application .subtitle-1{
  text-align: left;
  font-size: 18px!important;
  font-family: 'Kanit', sans-serif!important;
}

.v-chip .v-chip__content{
  font-weight: 500;
  text-transform: uppercase;
}


.v-card.map-item{
  width: 100%;
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
