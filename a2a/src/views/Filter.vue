<template>
    <div id="filter-view">
        <div id="">
            <v-card
            flat
            class="py-6"
            >
                <!-- Header with button -->
                <v-toolbar
                flat
                color="white"
                >
                    <v-row
                    align="center"
                    justify="space-around">
                        <v-col>
                            <h1 class="display-1">Filter</h1>
                        </v-col>
                        
                        <v-col
                        class="text-right"
                        >
                            <v-btn 
                            icon
                            elevation="2"
                            color="white"
                            value="map"
                            to="/map">
                                <v-icon color="black">mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-toolbar>
                
                <!-- Business Type Selection -->
                <v-card-text>
                <h2 class="subtitle-1">
                    Business Type
                </h2>
                <v-chip-group
                    column
                    multiple
                >
                    <v-chip
                    filter
                    outlined
                    >
                    Community Garden
                    </v-chip>
                    <v-chip
                    filter
                    outlined
                    >
                    Farm
                    </v-chip>
                    <v-chip
                    filter
                    outlined
                    >
                    Farm Training Program
                    </v-chip>
                    <v-chip
                    filter
                    outlined
                    >
                    General Food Access
                    </v-chip>
                    <v-chip
                    filter
                    outlined
                    >
                    Market
                    </v-chip>
                </v-chip-group>
                </v-card-text>

                <v-divider></v-divider>


                <!-- Distance Slider -->
                <v-card-text>
                        <h2 class="subtitle-1">
                            Distance
                        </h2>
                        <v-col class="pr-4">
                        <v-slider
                            step="0.25" 
                            color="black"
                            v-model="slider"
                            class="align-center"
                            :max="15"
                            hide-details
                        >
                            <template v-slot:append>
                            <v-text-field
                                v-model="slider"
                                class="mt-0 pt-0"
                                hide-details
                                single-line
                                type="number"
                                style="width: 60px"
                            ></v-text-field>
                            </template>
                        </v-slider>
                        </v-col>
                </v-card-text>

                <v-divider></v-divider>

                <!-- SNAP/EBT Toggle -->
                <v-card-text>
                <h2 class="subtitle-1">
                    SNAP/EBT Benefits
                </h2>
                <v-switch
                    v-model="switch1"
                    color="black"
                 ></v-switch>
                </v-card-text>

                <v-divider></v-divider>

                <!-- Products Selection -->
                <v-card-text>
                <h2 class="subtitle-1">
                    Products
                </h2>

                <v-chip-group
                    column
                    multiple
                    class="products"
                >
                    <v-chip
                    filter
                    outlined
                    >
                    Beef
                    </v-chip>

                    <v-chip
                    filter
                    outlined
                    >
                    Cheese
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Eggs
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Fish
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Fruit
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Grains
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Legumes
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Milk
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Nuts
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Pork
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Poultry
                    </v-chip>    

                    <v-chip
                    filter
                    outlined
                    >
                    Veggies
                    </v-chip>    

                </v-chip-group>
                </v-card-text>

                <v-divider></v-divider>

                <!-- Button Groups -->
                <v-card-text>
                    <v-row
                    class="py-4"
                    align="center"
                    justify="center">
                        <v-btn 
                        depressed
                        dark
                        class="mx-1"
                        >
                        Submit
                        </v-btn>
                        <v-btn 
                        depressed
                        outlined
                        class="mx-1"
                        value="map"
                        to="/map"
                        >
                        Cancel
                        </v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Filter"
}
</script>