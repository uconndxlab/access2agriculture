<template>
    <div id="map-page">
        <top-button-navigation></top-button-navigation>

        <full-map-background
            lat="41.6629199"
            long="-72.6889928"
            zoom="9.28"
        ></full-map-background>
    </div>
</template>

<script>
import TopButtonNavigation from '@/components/TopButtonNavigation.vue'
import FullMapBackground from '@/components/FullMapBackground.vue'

export default {
    name: "Map",
    components: {
        TopButtonNavigation,
        FullMapBackground
    }
}
</script>
