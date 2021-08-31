<template>
    <div class="page-geo">
        <v-container>
            <v-row justify="center">
                <v-col md="10">
                    <h1>Geo Tools</h1>
                    <p>Firebase requires a <a href="https://firebase.google.com/docs/firestore/solutions/geoqueries">Geohash</a> property saved on documents in order to perform distance queries.  This tool can generate hashes for the data set.</p>

                    <v-btn
                        color="primary"
                        @click="generateAllWithoutHash()"
                    >Generate Hashes For All Without</v-btn>

                    <v-list
                        two-line
                    >
                        <v-list-item
                            v-for="wp in waypoints"
                            :key="wp.id"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="wp.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="`[${wp.coordinates._lat}, ${wp.coordinates._long}]`"></v-list-item-subtitle>
                                <v-list-item-subtitle v-text="`Hash? ${wp.geohash ? wp.geohash : 'No'}`"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn text @click="generateHash(wp)">Generate Hash</v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
        
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as geofire from 'geofire-common'
import { waypointsCollection } from '@/firebase'

export default {
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            // This is a getter because deep object properties can be updated and need to be handled with Vue.set for reactivity
            waypoints: 'waypointObjects',
        })
    },
    methods: {
        ...mapActions(['fetchWaypoints']),
        ...mapMutations({
            updateWaypoint: 'setUpdatedWaypoint'
        }),
        generateHash(waypoint) {
            const hash = geofire.geohashForLocation([waypoint.coordinates._lat, waypoint.coordinates._long])

            const waypointRef = waypointsCollection.doc(waypoint.id)

            waypoint.geohash = hash

            waypointRef.update({
                geohash: hash
            }).then(() => {
                this.updateWaypoint(waypoint)
            })
        },
        generateAllWithoutHash() {
            this.waypoints.forEach( (w) => {
                if ( !w.geohash ) {
                    this.generateHash(w)
                }
            })
        }
    },
    mounted() {
        if ( !this.waypoints.length ) {
            this.fetchWaypoints()
        }
    }
}
</script>

