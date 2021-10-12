<template>
    <v-list-item
        :to="routerLink"
        v-if="waypoint && waypoint.name"
    >
        <v-list-item-avatar
            tile
            color="grey"
            v-if="waypoint.image"
        >
            <v-img
                :src="waypoint.image"
                :alt="'Photo of ' + waypoint.name"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{ waypoint.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ address }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="waypoint.hours">{{ waypoint.hours }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-card-actions>
            <v-btn icon @click.prevent="toggleBookmark()">
                <v-icon color="black">{{ bookmarkIcon }}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-list-item>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: "MapListItem",
    props: ['link', 'starting_waypoint'],
    data: () => ({
        bookmarked: false,
        waypoint: null
    }),
    computed: {
        address() {
            let addr = `${this.waypoint.address}, ${this.waypoint.town} ${this.waypoint.state}, ${this.waypoint.zip}`
            return addr
        },
        routerLink() {
            if ( this.link === 'false' || !this.waypoint.id ) {
                // If undefined, the item is not linkable
                return undefined
            }
            return '/map-item/' + this.waypoint.id
        },
        bookmarkIcon() {
            if ( this.bookmarked ) {
                return 'mdi-bookmark'
            }
            return 'mdi-bookmark-outline'
        }
    },
    methods: {
        ...mapMutations({
            'addBookmark': 'SET_BOOKMARK',
            'removeBookmark': 'UNSET_BOOKMARK'
        }),
        toggleBookmark() {
            if ( this.bookmarked ) {
                this.removeBookmark(this.waypoint.id)
                this.bookmarked = false
            } else {
                this.addBookmark(this.waypoint.id)
                this.bookmarked = true
            }
        },
        setWaypoint(waypoint) {
            this.waypoint = waypoint
            if ( this.waypoint && this.waypoint.bookmarked ) {
                this.bookmarked = this.waypoint.bookmarked
            } else {
                this.bookmarked = false
            }
        }
    },
    created() {
        if ( this.starting_waypoint ) {
            this.waypoint = this.starting_waypoint
        }
        if ( this.waypoint && this.waypoint.bookmarked ) {
            this.bookmarked = this.waypoint.bookmarked
        }
    }
}
</script>