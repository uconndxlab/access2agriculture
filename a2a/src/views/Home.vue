<template>
  <div class="home">
    <div class="main-content text-center">
      <v-btn class="dismiss" to="/map" fab small>
          <v-icon>mdi-close</v-icon>
      </v-btn>
      <app-icon />
      <h1 class="mb-4">Access2Ag</h1>
      <p class="mb-8">{{ string('HOMEPAGE_INTRO') }}</p>
      <v-btn class="mb-4" to="/routes" rounded color="primary">Filter By Route</v-btn><br>
      <v-btn to="/map" rounded color="primary">View Full Map</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppIcon from '@/components/AppIcon.vue'

export default {
    name: 'Home',
    components: {
        AppIcon
    },
    computed: {
        ...mapGetters({
            string: "string"
        })
    }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 20px;
  padding-left: 20px;
  .dismiss {
    position: absolute;
    top: 13px;
    right: 13px;
  }
}
</style>
