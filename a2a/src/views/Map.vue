<template>
    <div id="map-page">
        <top-button-navigation></top-button-navigation>

        <div id="map">
            <p>Map Goes Here</p>
            <v-btn
                value="Map Item"
                to="/map-item">
                Go to Map Item View
            </v-btn>
        </div>
    </div>
</template>

<script>
import TopButtonNavigation from '@/components/TopButtonNavigation.vue'

export default {
    name: "Map",
    components: {
        TopButtonNavigation
    }
}
</script>
