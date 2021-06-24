<template>
    <div id="map-page">
        <div id="top-nav">
            <v-card
                flat
                class="py-6"
            >
                <v-card-text>
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
                    value="map list"
                    to="/map-list">
                        <v-icon color="black">mdi-format-list-bulleted</v-icon>
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
                </v-card-text>
            </v-card>
        </div>

        <div id="map">
            <div id="mapContainer" class="basemap"></div>
            <v-btn
                value="Map Item"
                to="/map-item">
                Go to Map Item View
            </v-btn>
        </div>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoidWNvbm5keGdyb3VwIiwiYSI6ImNrcTg4dWc5NzBkcWYyd283amtpNjFiZXkifQ.iGpZ5PfDWFWWPkuDeGQ3NQ',
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-72.215410, 41.714030]
        },
        properties: {
        title: 'Covenant Soup Kitchen',
        description: '220 Valley Street Willimantic, Connecticut 06226'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-72.207748, 41.713280]
        },
        properties: {
        title: 'Holy Family Home & Shelter',
        description: '88 Jackson Street Willimantic, CT'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-72.228700, 41.715310]
        },
        properties: {
        title: 'Access Agency',
        description: '1315 Main St #2, Willimantic, CT 06226'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-72.201290, 41.725100]
        },
        properties: {
        title: 'Lauter Park Community Gardens',
        description: '557R Jackson St, Willimantic, CT 06226'
        }
    },
        {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-72.226250, 41.733920]
        },
        properties: {
        title: 'Valley Farms LLC',
        description: '500 Mansfield Ave, Mansfield Center, CT 06250'
        }
    },
        {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-72.249880, 41.811900]
        },
        properties: {
        title: 'UCONN New Farmers Program',
        description: '1376 Storrs Rd. Unit 4066 Storrs, CT 06269'
        }
    }]
    };

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
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    
    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML(
    '<h3>' +
    marker.properties.title +
    '</h3><p>' +
    marker.properties.description +
    '</p>'
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

#mapContainer{
    position: absolute; 
    top: 0; 
    bottom: 0; 
    width: 100%;
}

.marker {
    background-image: url('/assets/mapbox-icon.png');
    background-size: cover;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #fd4c4c;
    border-color: black;
    border: 1px solid
}

.mapboxgl-popup {
    max-width: 200px;
}

</style>