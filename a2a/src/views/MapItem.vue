<template>
    <div id="map-item-view">
        <p>This is a view for specific map items.  I can later convert this to a component and hook it up to data.</p>
        <p>Figma screen 3/6</p>

        <v-btn
            @click="overlay = !overlay"
        >Open Map Location Overlay</v-btn>

        <map-location-overlay :overlay="overlay" @closeOverlay="closeCurrentOverlay" />
    </div>
</template>

<script>
import MapLocationOverlay from "@/components/MapLocationOverlay.vue";

export default {
    name: "Map Item",
    components: {
        MapLocationOverlay
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