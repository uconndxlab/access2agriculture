<template>
  <div id="map-page">
    <top-button-navigation></top-button-navigation>

    <div id="map">
      <div id="mapContainer" class="basemap"></div>
    </div>

    <!-- <full-map-background
            lat="41.6629199"
            long="-72.6889928"
            zoom="9.28"
        ></full-map-background> -->
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import TopButtonNavigation from "@/components/TopButtonNavigation.vue";
import { mapGetters, mapActions } from "vuex";
// import FullMapBackground from '@/components/FullMapBackground.vue'

export default {
  name: "BaseMap",
  components: {
    TopButtonNavigation,
    // FullMapBackground
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidWNvbm5keGdyb3VwIiwiYSI6ImNrcTg4dWc5NzBkcWYyd283amtpNjFiZXkifQ.iGpZ5PfDWFWWPkuDeGQ3NQ",
      yourLocation: [41.765804, -72.673370]
    };
  },
  computed: {
    ...mapGetters({
      waypoints: "waypointObjectsByFilter",
      userLoc: "userLocation",
      userLocSet: "userLocationSet"
    }),
  },
  methods: {
    ...mapActions(['fetchWaypointsConditionally'])
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    var map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-72.253983, 41.807739],
      zoom: 10,
    });

    let geojson = {
      type: "FeatureCollection",
      features: [],
    };

    /*
    * Since we depend on the location's data, we need to wait until we have that data, especially on first page load.
    * So, we have a custom action here that will only fetch data if it hasn't been loaded already.
    */
    this.fetchWaypointsConditionally().then(() => {
      geojson.features = this.waypoints.map((wp) => {
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

      // add markers to map
      geojson.features.forEach(function (marker) {
        console.log('adding marker', marker)
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";


        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3>${marker.properties.title}</h3>
              <p>${marker.properties.description}</p>
              <p><a href="/#/map-item/${marker.properties.id}">Get Info</a></p>`
            )
          )
          .addTo(map);

        
      });

      if ( this.userLoc && this.userLocSet ) {
        var yourmark = document.createElement("div");
        yourmark.className = "marker your-marker";

        new mapboxgl.Marker(yourmark)
          .setLngLat([this.userLoc.long, this.userLoc.lat])
          .addTo(map)
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