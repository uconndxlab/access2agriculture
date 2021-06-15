<template>
    <div id="map-item-view">
        <top-button-navigation></top-button-navigation>

        <p>This is a view for specific map items.  I can later convert this to a component and hook it up to data.</p>
        <p>Figma screen 3/6</p>

        <v-btn
            @click="overlay = !overlay"
        >Open Map Location Overlay</v-btn>

        <map-location-overlay :overlay="overlay" @closeOverlay="closeCurrentOverlay" />

        <v-card
        class="mx-auto map-item"
        max-width="100%"
        outlined
        >
        <v-list-item >
        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        ></v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="subtitle-1">Map Item Name</v-list-item-title>
            <v-list-item-subtitle>Address</v-list-item-subtitle>
            <v-list-item-subtitle>Hours of Operation</v-list-item-subtitle>
        </v-list-item-content>

        <v-card-actions>
            <v-btn icon>
                <v-icon color="black">mdi-bookmark-outline</v-icon>
            </v-btn>
        </v-card-actions>
        </v-list-item>

        </v-card>

    </div>
    

</template>

<script>
import MapLocationOverlay from "@/components/MapLocationOverlay.vue";
import TopButtonNavigation from "@/components/TopButtonNavigation.vue";

export default {
    name: "MapItem",
    components: {
        MapLocationOverlay,
        TopButtonNavigation
    },
    data: () => ({
        overlay: false
    }),
    methods: {
        closeCurrentOverlay() {
            this.overlay = false
        }
    }
}
</script>


<style lang ="css" scoped>
.v-card.map-item{
    position: absolute;
    bottom: 0;
}
</style>