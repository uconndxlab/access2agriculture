<template>
    <div id="map-item-view">
        <top-button-navigation></top-button-navigation>

        <div class="full-map-bg">
            <iframe
                style="border:0"
                :src="mapEmbedLink"
            ></iframe>
        </div>
        

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
import { mapState } from 'vuex'

export default {
    name: "MapItem",
    components: {
        TopButtonNavigation,
        MapListItem
    },
    data: () => ({
        overlay: false,
        mapEmbedLink: ''
    }),
    computed: {
        ...mapState(['waypoints']),
    },
    methods: {
        closeCurrentOverlay() {
            this.overlay = false
        },
        rebindEmbedLink() {
            let base = "https://google.com/maps/embed/v1/place?key=AIzaSyCLjpBPrRW_-7nqlENiW1UKXVjQzBTpcUA&q="
            let fallback_coordinates = "41.71328,-72.207748"
            let wp = this.$store.getters.waypointById(this.$route.params.id)
            if ( wp && wp.coordinates ) {
                this.mapEmbedLink = `${base}${wp.coordinates._lat},${wp.coordinates._long}`
            }
            this.mapEmbedLink = `${base}${fallback_coordinates}`
        }
    },
    mounted() {
        this.rebindEmbedLink()
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