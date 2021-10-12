<template>
  <div id="map-page">
    <top-button-navigation :to-page="false" @topNavOpenFilter="openFilter()"></top-button-navigation>

    <div id="map">
      <div id="mapContainer" class="basemap"></div>
    </div>

    <v-dialog
      v-model="filter_dialog"
      max-width="90%"
    >
      <map-points-filter @filterCloseSelf="closeFilter()"></map-points-filter>
    </v-dialog>

    <v-alert
      class="intro-alert-description"
      type="info"
      dismissible
    >{{ string('HOMEPAGE_INTRO') }}</v-alert>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import TopButtonNavigation from "@/components/TopButtonNavigation.vue";
import Filter from "@/components/Filter.vue"
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BaseMap",
  components: {
    TopButtonNavigation,
    MapPointsFilter: Filter
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidWNvbm5keGdyb3VwIiwiYSI6ImNrcTg4dWc5NzBkcWYyd283amtpNjFiZXkifQ.iGpZ5PfDWFWWPkuDeGQ3NQ",
      filter_dialog: false,
      map: null,
      defaultMapConfig: {
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-72.253983, 41.607739],
        zoom: 9.5,
      },
      geojson: null,
      markers: []
    };
  },
  computed: {
    ...mapGetters({
      fullWaypoints: "waypointObjects",
      waypoints: "waypointObjectsByFilter",
      userLoc: "userLocation",
      userLocSet: "userLocationSet",
      string: "string"
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
    openFilter() {
      this.filter_dialog = true
    },
    closeFilter() {
      this.filter_dialog = false
      this.filterMapLayer()
    },
    filterMapLayer() {
      this.markers.forEach( (mark) => {
        if ( this.filteredMarkerIDs.includes(mark.properties.id) ) {
          if (!mark._pos) {
            console.log('adding marker')
            mark.addTo(this.map)
          } else {
            console.log('not adding marker, has pos')
          }
        } else {
          mark.remove()
          mark._pos = null
        }
      })
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    if ( this.userLoc && this.userLocSet ) {
      this.defaultMapConfig.center = [this.userLoc.long, this.userLoc.lat]
    }

    // Make any adjustments for mobile on initialization.  The browser may be resized at any time but we will leave that zoom up to the user, in case they have already interacted with it.
    if ( this.isSM || this.isXS ) {
      this.defaultMapConfig.zoom = 8
      // [ long, lat ]
      this.defaultMapConfig.center = [this.defaultMapConfig.center[0], this.defaultMapConfig.center[1] - 0.04]
    }

    this.map = new mapboxgl.Map(this.defaultMapConfig);

    this.geojson = {
      type: "FeatureCollection",
      features: [],
    };

    /*
    * Since we depend on the location's data, we need to wait until we have that data, especially on first page load.
    * So, we have a custom action here that will only fetch data if it hasn't been loaded already.
    */
    this.fetchWaypointsConditionally().then(() => {
      this.geojson.features = this.fullWaypoints.map((wp) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [wp.coordinates._long, wp.coordinates._lat],
          },
          properties: {
            title: wp.name,
            description: `${wp.address}, ${wp.town} ${wp.state}, ${wp.zip}`,
            id: wp.id
          },
        };
      });

      // Now we need to create markers for each geojson property.
      this.geojson.features.forEach( (marker) => {

        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";

        // Since we want something to pop up on marker click, we need to create a popup for this marker.
        const pop = new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${marker.properties.title}</h3>
            <p>${marker.properties.description}</p>
            <p><a href="/#/map-item/${marker.properties.id}">Get Info</a></p>`)

        // Create the marker object.  Not adding to map yet since we might be loading this view with a filter already active.
        const m = new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(pop)

        m.properties = marker.properties

        // Lets see if the filtered waypoints on initialization include this, find the index.
        const marker_initial_filter_index = this.waypoints.findIndex(el => {
          return el.id === marker.properties.id
        })

        // Marker was in the filter, so lets add it to the map
        if ( marker_initial_filter_index > -1 ) {
          m.addTo(this.map)
        }

        // Keep a record of the marker and current state, so we can filter later.
        this.markers.push(m);
      });

      // Set a custom marker for your current location, if provided.
      if ( this.userLoc && this.userLocSet ) {
        var yourmark = document.createElement("div");
        yourmark.className = "marker your-marker";

        new mapboxgl.Marker(yourmark)
          .setLngLat([this.userLoc.long, this.userLoc.lat])
          .addTo(this.map)
      }
    })
  },
};
</script>

<style lang="css">
.basemap {
  width: 100%;
  height: 100%;
}

.v-main__wrap {
  z-index: 0;
}

#mapContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: -1;
}

.marker::before{
    font-family: "Material Icons";
    content: "\e8b4";
    color: #333;
    font-size: 40px;
    cursor: pointer;
}

.your-marker::before{
    font-family: "Material Icons";
    content: "\e8b4";
    color: red;
    font-size: 40px;
    cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}
</style>

<style lang="scss" scoped>
.intro-alert-description {
  position: absolute;
  bottom: 4%;
  left: 8%;
  right: 8%;
  max-width: 500px;
  text-align: left;
}
</style>