<template>
    <div id="map-page">
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
export default {
    name: "Map"
}
</script>
