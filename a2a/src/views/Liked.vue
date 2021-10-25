<template>
    <div id="liked-view">
        <top-button-navigation></top-button-navigation>

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
                <v-list-item-content>You have no bookmarked locations.</v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapListItem from '@/components/MapListItem.vue'
import TopButtonNavigation from "@/components/TopButtonNavigation.vue"

export default {
    name: "Bookmarks",
    components: {
        MapListItem,
        TopButtonNavigation
    },
    data: () => ({}),
    computed: {
        ...mapGetters({ 
            products: 'productObjects',
            waypoints: 'bookmarkedWaypoints'
        })
    }
}
</script>