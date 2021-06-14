<template>
    <div id="map-list-view">
        <div id="">
            <v-card
                flat
                class="py-6"
            >
                <v-toolbar
                flat>
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
                    value="map"
                    to="/map">
                        <v-icon color="black">mdi-map</v-icon>
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
                </v-toolbar>
            </v-card>

            <v-list-item >
                <v-list-item-avatar
                    tile
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

            <v-divider
            inset
            ></v-divider>

            <v-list-item >
                <v-list-item-avatar
                    tile
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

            <v-divider
            inset
            ></v-divider>
        </div>
    </div>
</template>

<script>
export default {
    name: "Maplist"
}
</script>