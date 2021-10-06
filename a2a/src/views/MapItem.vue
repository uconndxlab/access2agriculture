<template>
    <div id="map-item-view">
        <top-button-navigation class="mt-8"></top-button-navigation>

        <full-map-background
            :lat="lat"
            :long="long"
        ></full-map-background>

        <v-card
        class="mx-auto map-item"
        max-width="100%"
        outlined
        >
            <map-list-item
                v-if="$store.getters.waypointById($route.params.id)"
                :waypoint="$store.getters.waypointById($route.params.id)"
                link="false"
            ></map-list-item>
        </v-card>

    </div>
    

</template>

<script>
import TopButtonNavigation from "@/components/TopButtonNavigation.vue";
import MapListItem from '@/components/MapListItem.vue'
import FullMapBackground from '@/components/FullMapBackground.vue'
import { mapState } from 'vuex'

export default {
    name: "MapItem",
    components: {
        TopButtonNavigation,
        MapListItem,
        FullMapBackground
    },
    data: () => ({
        overlay: false,
    }),
    computed: {
        ...mapState(['waypoints']),
        lat() {
            let wp = this.$store.getters.waypointById(this.$route.params.id)
            if ( wp && wp.coordinates ) {
                return wp.coordinates._lat
            }
            return undefined
        },
        long() {
            let wp = this.$store.getters.waypointById(this.$route.params.id)
            if ( wp && wp.coordinates ) {
                return wp.coordinates._long
            }
            return undefined
        }
    },
    methods: {
        closeCurrentOverlay() {
            this.overlay = false
        }
    }
}
</script>

<style>
.v-main__wrap {
    z-index: 0;
}
</style>
<style lang ="css" scoped>
.v-card.map-item{
    position: absolute;
    bottom: 0;
}

div.full-map-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}

div.full-map-bg iframe {
    width: 100%;
    height: 100%;
}
</style>