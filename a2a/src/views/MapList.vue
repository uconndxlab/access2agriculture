<template>
    <div id="map-list-view">
        <top-button-navigation
            :to-page="false"
            @topNavOpenFilter="openFilter()"
            @locationHasError="displayLocationError"
            @clickHome="$router.push('/')"
        ></top-button-navigation>

        <location-error ref="location_error_alert"></location-error>

        <v-list>
            <template
                v-for="(waypoint, index) in waypoints"
            >
                <map-list-item
                    :key="waypoint.id"
                    :starting_waypoint="waypoint"
                ></map-list-item>

                <v-divider
                    v-if="index < waypoints.length - 1"
                    :key="index"
                ></v-divider>
            </template>
            <v-list-item
                v-if="!waypoints || waypoints.length === 0"
            >
                <v-list-item-content>No locations match your current filter.</v-list-item-content>
            </v-list-item>
        </v-list>

        <v-dialog
            v-model="filter_dialog"
            max-width="90%"
        >
            <map-points-filter @filterCloseSelf="closeFilter()"></map-points-filter>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapListItem from '@/components/MapListItem.vue'
import TopButtonNavigation from "@/components/TopButtonNavigation.vue"
import Filter from "@/components/Filter.vue"
import LocationError from "@/components/LocationError.vue"

export default {
    name: "Maplist",
    components: {
        MapListItem,
        TopButtonNavigation,
        MapPointsFilter: Filter,
        LocationError
    },
    data: () => ({
        filter_dialog: false
    }),
    computed: {
        ...mapGetters({ 
            products: 'productObjects',
            waypoints: 'waypointObjectsByFilter'
        })
    },
    methods: {
        closeFilter() {
            this.filter_dialog = false
        },
        openFilter() {
            this.filter_dialog = true
        },
        displayLocationError(message) {
            this.$refs.location_error_alert.updateMessage(message)
            this.$refs.location_error_alert.showAlertForTime(10000)
        },
    }
}
</script>