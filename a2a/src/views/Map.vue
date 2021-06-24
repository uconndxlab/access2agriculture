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
import { mapGetters } from "vuex";
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
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    let geojson = {
      type: "FeatureCollection",
      features: [],
    };

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
        },
      };
    });

    console.log(geojson)

    // var geojson = {
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-72.21541, 41.71403],
    //       },
    //       properties: {
    //         title: "Covenant Soup Kitchen",
    //         description: "220 Valley Street Willimantic, Connecticut 06226",
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-72.207748, 41.71328],
    //       },
    //       properties: {
    //         title: "Holy Family Home & Shelter",
    //         description: "88 Jackson Street Willimantic, CT",
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-72.2287, 41.71531],
    //       },
    //       properties: {
    //         title: "Access Agency",
    //         description: "1315 Main St #2, Willimantic, CT 06226",
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-72.20129, 41.7251],
    //       },
    //       properties: {
    //         title: "Lauter Park Community Gardens",
    //         description: "557R Jackson St, Willimantic, CT 06226",
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-72.22625, 41.73392],
    //       },
    //       properties: {
    //         title: "Valley Farms LLC",
    //         description: "500 Mansfield Ave, Mansfield Center, CT 06250",
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-72.24988, 41.8119],
    //       },
    //       properties: {
    //         title: "UCONN New Farmers Program",
    //         description: "1376 Storrs Rd. Unit 4066 Storrs, CT 06269",
    //       },
    //     },
    //   ],
    // };

    var map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-72.21, 41.71],
      zoom: 12,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

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
            .setHTML(
              "<h3>" +
                marker.properties.title +
                "</h3><p>" +
                marker.properties.description +
                "</p>"
            )
        )
        .addTo(map);
    });
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