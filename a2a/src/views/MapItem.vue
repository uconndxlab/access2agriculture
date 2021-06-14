<template>
    <div id="map-item-view">
        <div id="">
            <v-card
                flat
                class="py-6"
            >
                <v-card-text>
                <v-row
                    align="center"
                    justify="space-around"
                >
                    <v-btn-toggle
                    rounded
                    >
                    <v-btn 
                    elevation="2"
                    color="white"
                    value="map list"
                    to="/map-list">
                        <v-icon color="black">mdi-format-list-bulleted</v-icon>
                    </v-btn>
                    <v-btn 
                    elevation="2"
                    color="white"
                    value="filter"
                    to="/filter"> 
                        <v-icon color="black">mdi-filter-variant</v-icon>
                    </v-btn>
                    </v-btn-toggle>

                    <v-btn-toggle
                    rounded
                    >
                    <v-btn 
                    elevation="2"
                    color="white">
                        <v-icon color="black">mdi-bookmark</v-icon>
                    </v-btn>
                    <v-btn 
                    elevation="2"
                    color="white">
                        <v-icon color="black">mdi-cog</v-icon>
                    </v-btn>
                    </v-btn-toggle>
                </v-row>
                </v-card-text>
            </v-card>
        </div>
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


<style lang ="css" scoped>
.v-card.map-item{
    position: absolute;
    bottom: 0;
}
</style>