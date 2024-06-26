<template>
    <div class="filter-component">
        <v-card
            flat
            class="pb-6"
        >

            <v-app-bar
                color="#000000"
                class="filter-app-bar"
            >
                <v-btn 
                    icon
                    color="white"
                    class="mr-3"
                    @click="closeSelf()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-h6 white--text pl-0">
                    Filter
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn 
                    text
                    dark
                    @click="setFilter()"
                >Submit</v-btn>
            </v-app-bar>

            <!-- Business Type Selection -->
            <v-card-title class="subtitle-1">Business Type</v-card-title>
            <v-card-text>
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
                    >
                        <div class="bt-chip-color" :style="`background-color: ${getColorCode(businessType.color)} `"></div>
                    {{ businessType.name }}</v-chip>
                </v-chip-group>
            </v-card-text>

            <v-divider></v-divider>


            <!-- Distance Slider -->
            <v-card-title class="subtitle-1">Distance (Miles)</v-card-title>
            <v-card-text>
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

                <p v-if="proposedFilter.distance > 0">In order to accurately filter locations based on your location, we will need access to your current location.</p>

                <div style="display:flex">
                    <v-alert
                    :type="locationStatusMessageType"
                    dense
                    color="#ee741c"
                    class="distance-filter-notice"
                    v-if="proposedFilter.distance > 0"
                >
                    {{ locationStatusMessage }}
                    <span class="custom-loader" v-if="showLocationStatusLoading">
                        <v-icon light>mdi-cached</v-icon>
                    </span>
                </v-alert>
                </div>

                <div style="display:flex">
                    <v-btn
                        @click="requestLocation()"
                        v-if="proposedFilter.distance > 0"
                        class="distance-filter-notice"
                    >{{ locationButtonText }}</v-btn>
                </div>
                
                
                </v-col>
            </v-card-text>

            <v-divider></v-divider>

            <!-- SNAP/EBT Toggle -->
            <v-card-title class="subtitle-1">Assistance Options</v-card-title>
            <v-card-text>
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

            <!-- Route selection, not currently hooked up. -->
            <v-card-title class="subtitle-1">Bus Routes</v-card-title>
            <v-card-text>
                <v-chip-group
                    column
                    multiple
                    v-model="proposedFilter.routes"
                    class="routes"
                >
                    <v-chip
                        v-for="route in routes"
                        :key="`route-chip-${route.id}`"
                        filter
                        outlined
                        :value="route.id"
                    >
                        <div class="chip-color-line" :style="`background-color: #${route.route_color}`"></div>
                    {{ route.name }}</v-chip>
                </v-chip-group>
            </v-card-text>

            <v-divider></v-divider>

            <!-- Products Selection -->
            <v-card-title class="subtitle-1">Products</v-card-title>
            <v-card-text>
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
                class="py-4 mt-2"
                align="center"
                justify="center">
                    <v-btn 
                        outlined
                        @click="clearFilter()"
                    >Clear</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data: () => ({
        proposedFilter: {
            businessTypes: [],
            distance: 0.0,
            assistanceOptions: [],
            products: [],
            routes: []
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
            initialFilter: 'initialFilter',
            locationHasBeenSet: 'userLocationSet',
            getColorCode: 'colorLookup',
            routes: 'routeObjects'
        }),
        locationButtonText() {
            return (this.locationHasBeenSet) ? 'Re-check Location' : 'Enable Location'
        }
    },
    methods: {
        ...mapMutations({
            'setCoordinates': 'SET_USER_COORDINATES',
        }),
        setFilter() {
            const filter = {}
            Object.assign(filter, this.proposedFilter)
            this.$store.commit('SET_FILTER', filter)
            this.closeSelf()
        },
        clearFilter() {
            this.$store.commit('RESET_FILTER')
            this.proposedFilter = this.initialFilter
            this.closeSelf()
        },
        locationHasSet() {
            this.showLocationStatusLoading = false
            this.locationStatusMessage = 'Location Found!'
            this.locationStatusMessageType = 'success'
        },
        requestLocation() {
            this.showLocationStatusLoading = true
            if ( !navigator.geolocation ) {
                console.log('Browser does not support location.')
                this.showLocationStatusLoading = false
            } else {
                console.log('Browser supports location.')
                this.locationStatusMessage = 'Finding location.'
                navigator.geolocation.getCurrentPosition((pos) => {
                    if ( pos.coords && pos.coords.latitude && pos.coords.longitude ) {
                        this.locationHasSet()
                        this.setCoordinates({
                            lat: pos.coords.latitude,
                            long: pos.coords.longitude
                        })
                    }
                }, (error) => {
                    const default_error_message = 'Something went wrong with the location service.'
                    const error_messages = {
                        '1': 'Permission to location was denied.  In order to enable this functionality, you must enable location permissions manually on your browser.',  // User denied geolocation,
                        '2': 'Unable to determine location from this device.',
                        '3': 'Location detection timed out.'
                    }
                    if ( error.code && error.code.toString() in error_messages ) {
                        this.locationStatusMessage = error_messages[error.code.toString()]
                    } else {
                        this.locationStatusMessage = default_error_message
                    }
                    this.showLocationStatusLoading = false
                })
            }
        },
        closeSelf() {
            this.$emit('filterCloseSelf')
        }
    },
    mounted() {
        const filter = {}
        Object.assign(filter, this.filter)
        this.proposedFilter = filter
        if ( this.locationHasBeenSet ) {
            this.locationHasSet()
        }
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

  p {
      text-align: left;
  }
  .distance-filter-notice {
      display: inline-block;
      text-align: left;
      width: auto;
  }

.filter-app-bar {
    position: sticky;
    top: 0;
    z-index: 99;
}

.bt-chip-color {
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 8px;
}

.chip-color-line {
    width: 15px;
    height: 6px;
    display: inline-block;
    margin-right: 5px;
    border: 1px solid black;
}
</style>