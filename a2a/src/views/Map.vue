<template>
    <div id="map-page">
        <top-button-navigation></top-button-navigation>

        

        <div id="map">
            <iframe
                width="600"
                height="600"
                style="border:0"
                src="https://google.com/maps/embed/v1/place?key=AIzaSyCLjpBPrRW_-7nqlENiW1UKXVjQzBTpcUA&q=41.71328,-72.207748"
            ></iframe>
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
