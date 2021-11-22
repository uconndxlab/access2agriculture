<template>
  <div id="map-page">
    <top-button-navigation
      :to-page="false"
      @topNavOpenFilter="openFilter()"
      @locationJustSet="userJustSetNearMeLocation()"
      @locationHasError="displayLocationError"
      @clickHome="navigateToDefaultMapView()"
    ></top-button-navigation>

    <div id="map">
        <filter-summary></filter-summary>
        <no-locations>
            <p class="d-flex align-start ml-3">No locations with current filter.</p>
        </no-locations>
      <div id="mapContainer" class="basemap"></div>
      <v-btn class="snap-to-location-btn" v-if="userLoc && userLocSet" @click="flyToUserLocation()">
          <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
    </div>

    <v-dialog
      v-model="filter_dialog"
      max-width="90%"
    >
      <map-points-filter @filterCloseSelf="closeFilter()"></map-points-filter>
    </v-dialog>

    <location-error ref="location_error_alert"></location-error>

    <v-alert
      class="intro-alert-description"
      type="info"
      dismissible
      @input="closeIntro()"
      :value="showIntro"
    >{{ string('HOMEPAGE_INTRO') }}</v-alert>

    <no-locations :filtered="true">
        <v-alert
            :value="showNoWaypointsInView" 
            class="intro-alert-description"
            dismissible
            @input="closeNoWaypointsInView()"    
        >
            <p>{{ string('NO_WAYPOINTS_IN_VIEW') }}</p>
            <v-btn @click="navigateToDefaultMapView();closeNoWaypointsInView()" class="mr-3">Go</v-btn>
            <v-btn @click="closeNoWaypointsInView()">Close</v-btn>
        </v-alert>
    </no-locations>

    <waypoint-full-card ref="waypoint_full_card"></waypoint-full-card>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"
import TopButtonNavigation from "@/components/TopButtonNavigation.vue"
import Filter from "@/components/Filter.vue"
import LocationError from "@/components/LocationError.vue"
import WaypointFullCard from "@/components/WaypointFullCard.vue"
import FilterSummary from "@/components/FilterSummary.vue"
import NoLocations from "@/components/NoLocations.vue"
import { deepCloneWaypoint } from "@/helpers/deepClone.js"
import { mapGetters, mapActions, mapMutations } from "vuex"

export default {
    name: "BaseMap",
    components: {
        TopButtonNavigation,
        MapPointsFilter: Filter,
        LocationError,
        WaypointFullCard,
        FilterSummary,
        NoLocations
    },
    data() {
        return {
            accessToken: "pk.eyJ1IjoidWNvbm5keGdyb3VwIiwiYSI6ImNrcTg4dWc5NzBkcWYyd283amtpNjFiZXkifQ.iGpZ5PfDWFWWPkuDeGQ3NQ",
            filter_dialog: false,
            map: null,
            defaultMapConfig: {
                container: "mapContainer",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-72.253983, 41.607739],
                zoom: 9.5,
            },
            geojson: null,
            markers: [],
            userMarker: null,
        }
    },
    computed: {
        ...mapGetters({
            fullWaypoints: "waypointObjects",
            waypoints: "waypointObjectsByFilter",
            userLoc: "userLocation",
            userLocSet: "userLocationSet",
            string: "string",
            waypointById: "waypointById",
            showIntro: "showIntro",
            showNoWaypointsInView: "showNoWaypointsInView",
            businessTypes: "businessTypeObjects"
        }),
        isSM() {
            return this.$vuetify.breakpoint.name === 'sm'
        },
        isXS()  {
            return this.$vuetify.breakpoint.name === 'xs'
        },
        filteredMarkerIDs() {
            return this.waypoints.map(x => {
                return x.id
            })
        }
    },
    methods: {
        ...mapActions(['fetchWaypointsConditionally']),
        ...mapMutations({
            'closeIntro': 'CLOSE_INTRO',
            'openNoWaypointsInView': 'SHOW_NO_WAYPOINTS_IN_VIEW',
            'closeNoWaypointsInView': 'CLOSE_NO_WAYPOINTS_IN_VIEW'
        }),
        openFilter() {
            this.filter_dialog = true
            this.closeIntro()
        },
        closeFilter() {
            this.filter_dialog = false
            this.filterMapLayer()
        },
        filterMapLayer() {
            this.markers.forEach( (mark) => {
                // Close open popups
                if ( mark.getPopup().isOpen() ) {
                    mark.getPopup().remove()
                }
                if ( this.filteredMarkerIDs.includes(mark.properties.id) ) {
                    if (!mark._pos) {
                        // console.log('adding marker')
                        mark.addTo(this.map)
                    }
                    // else {
                    //     console.log('not adding marker, has pos')
                    // }
                } else {
                    mark.remove()
                    mark._pos = null
                }
            })
        },
        navigateToDefaultMapView() {
            this.filterMapLayer()
            this.map.flyTo({
                center: this.defaultMapConfig.center,
                zoom: this.defaultMapConfig.zoom
            })
        },
        navigateToSingleWaypoint(waypointID) {
            this.closeIntro()
            let matched_marker = null
            this.markers.forEach( (mark) => {
                if ( mark.properties.id === waypointID ) {
                    matched_marker = mark
                    if ( !mark._pos ) {
                        mark.addTo(this.map)
                    }
                    if ( !mark.getPopup().isOpen() ) {
                        mark.getPopup().addTo(this.map)
                    }
                } else {
                    mark.remove()
                    mark._pos = null
                }
            })

            if ( matched_marker ) {
                this.map.flyTo({
                    center: [matched_marker._lngLat.lng, matched_marker._lngLat.lat],
                    zoom: 14
                })
                if ( this.$route.path !== '/map-item/' + waypointID) {
                    this.$router.push({ name: 'map-item-by-id', params: { id: waypointID }})
                }
            }
      
        },
        // This has to be added separately since its generated by mapbox.
        mountWaypointGetInfoListener(e) {
            if ( e.target.classList.contains('marker-get-info-text') ) {
                this.closeIntro()
                if ( 'markerId' in e.target.dataset ) {
                    // this.navigateToSingleWaypoint(e.target.dataset.markerId)
                    this.openFullWaypointCard(e.target.dataset.markerId)
                }
            }
        },
        setUserLocationMarker() {
            // Set a custom marker for your current location, if provided.
            if ( this.userLoc && this.userLocSet && !this.userMarker ) {
                var yourmark = document.createElement("div")
                yourmark.className = "marker your-marker"

                this.userMarker = new mapboxgl.Marker(yourmark)
                    .setLngLat([this.userLoc.long, this.userLoc.lat])
                    .addTo(this.map)

                this.checkAndAlertForVisibleMarkers()
            }
        },
        userJustSetNearMeLocation() {
            this.setUserLocationMarker()
            this.flyToUserLocation()
            this.closeIntro()
        },
        displayLocationError(message) {
            this.$refs.location_error_alert.updateMessage(message)
            this.$refs.location_error_alert.showAlertForTime(10000)
        },
        flyToUserLocation() {
            if ( this.userLoc && this.userLocSet && this.userMarker ) {
                this.map.flyTo({
                    center: [this.userLoc.long, this.userLoc.lat],
                    zoom: 11
                })
                this.checkAndAlertForVisibleMarkers()
            }
        },
        openFullWaypointCard(waypointID) {
            const wp = deepCloneWaypoint(
                this.waypoints.find(x => x.id == waypointID)
            )

            if ( wp ) {
                this.$refs.waypoint_full_card.openWithWaypoint(wp)
            }
        },
        elementOutsideOfBounding(bounding, element) {
            return element.left > bounding.right
            || element.right < bounding.left
            || element.top > bounding.bottom
            || element.bottom < bounding.top
        },
        areMarkersInView() {
            const mapContainer = this.map.getContainer()
            const markers = mapContainer.getElementsByClassName('waypoint-marker')
            const mapContainerRect = mapContainer.getBoundingClientRect()

            let visibles = []

            for ( let i = 0; i < markers.length; i++ ) {
                const el = markers.item(i)
                const elRect = el.getBoundingClientRect()
                const outside = this.elementOutsideOfBounding(mapContainerRect, elRect)

                if ( !outside ) {
                    visibles.push(el)
                }
            }

            return visibles.length > 0

        },
        checkAndAlertForVisibleMarkers() {
            setTimeout(() => {
                if ( !this.areMarkersInView() ) {
                    console.log('We should ask if you want to go back to default view.')
                    this.openNoWaypointsInView()
                }
            }, 3000)
        }
    },
    mounted() {
        document.addEventListener("click", this.mountWaypointGetInfoListener)

        mapboxgl.accessToken = this.accessToken

        if ( this.userLoc && this.userLocSet ) {
            this.defaultMapConfig.center = [this.userLoc.long, this.userLoc.lat]
        }

        // Make any adjustments for mobile on initialization.  The browser may be resized at any time but we will leave that zoom up to the user, in case they have already interacted with it.
        if ( this.isSM || this.isXS ) {
            this.defaultMapConfig.zoom = 8
            // [ long, lat ]
            this.defaultMapConfig.center = [this.defaultMapConfig.center[0], this.defaultMapConfig.center[1] - 0.04]
        }

        this.map = new mapboxgl.Map(this.defaultMapConfig)

        this.geojson = {
            type: "FeatureCollection",
            features: [],
        }

        /*
    * Since we depend on the location's data, we need to wait until we have that data, especially on first page load.
    * So, we have a custom action here that will only fetch data if it hasn't been loaded already.
    */
        this.fetchWaypointsConditionally().then(() => {
            this.geojson.features = this.fullWaypoints.map((wp) => {
                let properties = {
                    title: wp.name,
                    description: `${wp.address}, ${wp.town} ${wp.state}, ${wp.zip}`,
                    id: wp.id,
                    color: null
                }

                const bt = this.businessTypes.find(x => x.name === wp.type)
                if ( bt && bt.color ) {
                    properties.color = bt.color
                }
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [wp.coordinates._long, wp.coordinates._lat],
                    },
                    properties: properties,
                }
            })

            // Now we need to create markers for each geojson property.
            this.geojson.features.forEach( (marker) => {

                // create a HTML element for each feature
                var el = document.createElement("div")
                let classnames = "marker waypoint-marker"
                if ( marker.properties.color ) {
                    classnames += " marker-color-" + marker.properties.color
                }
                el.className = classnames

                // Since we want something to pop up on marker click, we need to create a popup for this marker.
                const pop = new mapboxgl.Popup({ offset: 10 }) // add popups
                    .setHTML(`<h3>${marker.properties.title}</h3>
            <p>${marker.properties.description}</p>
            <p><button type="button" class="v-btn v-btn--block v-btn--has-bg theme--light v-size--default marker-get-info-text primary" data-marker-id="${marker.properties.id}"><span class="v-btn__content">Get Info</span></button></p>`)

                // Create the marker object.  Not adding to map yet since we might be loading this view with a filter already active.
                const m = new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(pop)

                m.properties = marker.properties

                // We might be initializing on a map item already.  Lets check.
                const routed_from_map_item = this.$route.name === 'map-item-by-id' && this.$route.params && this.$route.params.id

                // Keep a record of the marker and current state, so we can filter later.
                this.markers.push(m)

                if ( routed_from_map_item ) {
                    const is_correct_routed_marker = this.$route.params.id === marker.properties.id
                    if ( is_correct_routed_marker ) {
                        m.addTo(this.map)
                    }
                    // Keep a record of the marker and current state, so we can filter later.
                    // This looks insane because these need to be done in this exact order, otherwise we cant scroll properly.
                    this.markers.push(m)
                    if ( is_correct_routed_marker ) {
                        this.navigateToSingleWaypoint(marker.properties.id)
                    }
                } else {
                    // Lets see if the filtered waypoints on initialization include this, find the index.
                    const marker_initial_filter_index = this.waypoints.findIndex(el => {
                        return el.id === marker.properties.id
                    })

                    // Marker was in the filter, so lets add it to the map
                    if ( marker_initial_filter_index > -1 ) {
                        m.addTo(this.map)
                    }
                    // Keep a record of the marker and current state, so we can filter later.
                    this.markers.push(m)
                }
            })

            this.setUserLocationMarker()

            this.checkAndAlertForVisibleMarkers()
        })
    },
    beforeDestroy() {
        document.removeEventListener("click", this.mountWaypointGetInfoListener)
    },
    watch: {
        '$route.path': function(val) {
            if ( val === '/' ) {
                this.navigateToDefaultMapView()
            }
        },
        'filteredMarkerIDs': function() {
            this.filterMapLayer()
        }
    }
}
</script>

<style lang="css">
html {
  height: 100%;
  min-height: -webkit-fill-available;
}
body {
  height: 100%;
}



@supports (-webkit-appearance: none) {
  /** SUPER TEMPORARY FIX FOR MOBILE */
  #map-page {
    height: calc(100% - 56px);
    position: relative;
    z-index: 1
  }
}

.v-main__wrap {
  z-index: 0;
}

#mapContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#mapContainer .mapboxgl-popup-close-button {
    right: 7px;
    font-size: 28px;
    top: 7px;
    padding: 5px;
}

/* .marker::before{
    font-family: 'Material Design Icons';
    color: #333;
    font-size: 40px;
    cursor: pointer;
}

.your-marker::before{
    color: red;
} */

.marker {
    background-color: black;
    width: 14px;
    height: 14px;
    border-radius: 16px;
    border: 2px solid white;
    cursor: pointer;
}

.your-marker {
    background-color: red;
}

.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
    font-size: 14px;
}
.mapboxgl-popup-content > p {
    margin-bottom: 8px!important;
}

.marker-get-info-text {
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.marker-get-info-text span {
  pointer-events: none;
}

.v-card.map-item{
  position: absolute;
  bottom: 0;
}
</style>

<style lang="scss">
$marker-colors: ("black": #000000, "green": #56a744, "orange": #FF5733, "blue": #428EF4, "pink": #F142F4);

@each $name, $marker-color in $marker-colors {
    .marker.marker-color-#{"" + $name} {
        background-color: #{$marker-color};
    }
}
</style>

<style lang="scss" scoped>
.snap-to-location-btn {
    position: absolute;
    bottom: 30px;
    right: 20px;
}

.intro-alert-description {
  position: absolute;
  bottom: 4%;
  left: 8%;
  right: 8%;
  max-width: 500px;
  text-align: left;
}
</style>