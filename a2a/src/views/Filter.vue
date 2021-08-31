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
                            to="/">
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
                            Distance (Miles)
                        </h2>
                        <v-col class="pr-4">
                        <v-slider
                            step="1" 
                            color="black"
                            v-model="proposedFilter.distance"
                            class="align-center"
                            :max="120"
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

                <v-card-text v-if="proposedFilter.distance > 0">
                    <p>In order to accurately filter locations based on your location, we will need access to your current location.</p>

                    <v-alert
                        :type="locationStatusMessageType"
                        dense
                        color="blue"
                    >
                        {{ locationStatusMessage }}
                        <span class="custom-loader" v-if="showLocationStatusLoading">
                            <v-icon light>mdi-cached</v-icon>
                        </span>
                        
                    </v-alert>

                    <v-btn
                        @click="requestLocation()"
                    >Enable Location</v-btn>
                </v-card-text>

                <v-divider></v-divider>

                <!-- SNAP/EBT Toggle -->
                <v-card-text>
                    <h2 class="subtitle-1">
                        Assistance Options
                    </h2>
                    <v-chip-group
                        column
                        multiple
                        v-model="proposedFilter.assistanceOptions"
                    >
                        <v-chip
                            v-for="opt in assistanceOptions"
                            :key="opt.id"
                            filter
                            outlined
                            :value="opt.id"
                        >{{ opt.name }}</v-chip>
                    </v-chip-group>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: "WaypointFilter",
    data: () => ({
        proposedFilter: {
            businessTypes: [],
            distance: 0.0,
            assistanceOptions: [],
            products: []
        },
        locationStatusMessage: 'Location has not been detected.',
        locationStatusMessageType: 'info',
        showLocationStatusLoading: false
    }),
    computed: {
        ...mapGetters({
            products: 'productObjects',
            businessTypes: 'businessTypeObjects',
            assistanceOptions: 'assistanceOptionsObjects',
            filter: 'filterObject',
            initialFilter: 'initialFilter'
        })
    },
    methods: {
        ...mapMutations({
            'setCoordinates': 'SET_USER_COORDINATES'
        }),
        setFilter() {
            this.$store.commit('SET_FILTER', this.proposedFilter)
        },
        clearFilter() {
            this.$store.commit('RESET_FILTER')
            this.proposedFilter = this.initialFilter
        },
        requestLocation() {
            this.showLocationStatusLoading = true
            if ( !navigator.geolocation ) {
                console.log('Not able to retrieve location.')
                this.showLocationStatusLoading = false
            } else {
                console.log('Has access to location.')
                this.locationStatusMessage = 'Finding location.'
                navigator.geolocation.getCurrentPosition((pos) => {
                    console.log(pos)
                    this.showLocationStatusLoading = false
                    if ( pos.coords && pos.coords.latitude && pos.coords.longitude ) {
                        this.locationStatusMessage = 'Location Found!'
                        this.locationStatusMessageType = 'success'
                        this.setCoordinates({
                            lat: pos.coords.latitude,
                            long: pos.coords.longitude
                        })
                    }
                }, (error) => {
                    console.log(error)
                    const default_error_message = 'Something went wrong with the location service.'
                    const error_messages = {
                        '1': 'Permission to location was denied.  In order to enable this functionality, you must enable location permissions manually on your browser.'  // User denied geolocation
                    }
                    if ( error.code && error.code.toString() in error_messages ) {
                        this.locationStatusMessage = error_messages[error.code.toString()]
                    } else {
                        this.locationStatusMessage = default_error_message
                    }
                    this.showLocationStatusLoading = false
                })
            }
        }
    },
    mounted() {
        this.proposedFilter = this.filter
    }
}
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: inline-block;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
