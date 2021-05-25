<template>
    <v-overlay
        :value="overlay"
        absolute>
        <p>Here is where we might break out information about a map item, such as the image in Figma design 4/6</p>
        <v-btn @click="close">Close Overlay</v-btn>
    </v-overlay>
</template>

<script>
export default {
    name: "Overlay",
    props: {
        overlay: Boolean
    },
    methods: {
        close() {
            this.$emit('closeOverlay')
        }
    }
}
</script>