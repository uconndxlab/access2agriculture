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
                            value="map-list"
                            to="/map-list">
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
                        v-model="proposedFilter.businessTypes"
                    >
                        <v-chip
                            v-for="businessType in businessTypes"
                            :key="businessType.name"
                            filter
                            outlined
                            :value="businessType.name"
                        >{{ businessType.name }}</v-chip>
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
                            v-model="proposedFilter.distance"
                            class="align-center"
                            :max="15"
                            hide-details
                        >
                            <template v-slot:append>
                            <v-text-field
                                v-model="proposedFilter.distance"
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
                    v-model="proposedFilter.snap_ebt"
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
                        v-model="proposedFilter.products"
                        class="products"
                    >
                        <v-chip
                            v-for="product in products"
                            :key="product.id"
                            filter
                            outlined
                            :value="product.id"
                        >{{ product.name }}</v-chip>
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
                            @click="setFilter()"
                        >Submit</v-btn>
                        <v-btn 
                            depressed
                            outlined
                            class="mx-1"
                            value="map"
                            @click="clearFilter()"
                        >Clear</v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "WaypointFilter",
    data: () => ({
        proposedFilter: {
            businessTypes: [],
            distance: 0.0,
            snap_ebt: false,
            products: []
        }
    }),
    computed: {
        ...mapGetters({
            products: 'productObjects',
            businessTypes: 'businessTypeObjects',
            filter: 'filterObject',
            initialFilter: 'initialFilter'
        })
    },
    methods: {
        setFilter() {
            this.$store.commit('SET_FILTER', this.proposedFilter)
        },
        clearFilter() {
            this.$store.commit('RESET_FILTER')
            this.proposedFilter = this.initialFilter
        }
    },
    mounted() {
        this.proposedFilter = this.filter
    }
}
</script>