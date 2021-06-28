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
    };
  },
  computed: {
    ...mapGetters({
      waypoints: "waypointObjectsByFilter",
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

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

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

.marker {
  background-image: url("/assets/mapbox-icon.png");
  background-size: cover;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fd4c4c;
  border-color: black;
  border: 1px solid;
}

.mapboxgl-popup {
  max-width: 200px;
}
</style>