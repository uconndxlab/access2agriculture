<template>
    <div id="map-list-view">
        <top-button-navigation></top-button-navigation>

            <v-list>
                <template
                    v-for="(waypoint, index) in waypoints"
                >
                    <map-list-item
                        :key="waypoint.id"
                        :waypoint="waypoint"
                    ></map-list-item>

                    <v-divider
                        v-if="index < waypoints.length - 1"
                        :key="index"
                    ></v-divider>
                </template>
            </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapListItem from '@/components/MapListItem.vue'
import TopButtonNavigation from "@/components/TopButtonNavigation.vue";

export default {
    name: "Maplist",
    components: {
        MapListItem,
        TopButtonNavigation
    },
    data: () => ({}),
    computed: {
        ...mapGetters({ 
            products: 'productObjects',
            waypoints: 'waypointObjects'
        })
    }
}
</script>