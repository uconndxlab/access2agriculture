<template>
    <div class="full-map-bg">
        <iframe
            style="border:0"
            :src="mapEmbedLink"
        ></iframe>
    </div>
</template>

<script>
export default {
    name: 'FullMapBackground',
    props: ['lat', 'long', 'zoom'],
    data: () => ({}),
    computed: {
        mapEmbedLink() {
            let base = "https://google.com/maps/embed/v1/place?key=AIzaSyCLjpBPrRW_-7nqlENiW1UKXVjQzBTpcUA&q="
            let fallback_coordinates = "41.71328,-72.207748"
            let coordinates = fallback_coordinates
            if ( this.lat && this.long ) {
                coordinates = `${this.lat},${this.long}`
            }
            if ( this.zoom ) {
                coordinates = coordinates + '&zoom=' + this.zoom
            }
            return `${base}${coordinates}`
        }
    }
}
</script>

<style>
.v-main__wrap {
    z-index: 0;
}
</style>
<style scoped>
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