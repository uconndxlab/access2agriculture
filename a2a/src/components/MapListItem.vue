<template>
    <v-list-item
        :to="routerLink"
        v-if="waypoint && waypoint.name"
    >
        <v-list-item-avatar
            tile
            color="grey"
        ></v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{ waypoint.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ address }}</v-list-item-subtitle>
            <v-list-item-subtitle>Hours of Operation</v-list-item-subtitle>
        </v-list-item-content>

        <v-card-actions>
            <v-btn icon>
                <v-icon color="black">mdi-bookmark-outline</v-icon>
            </v-btn>
        </v-card-actions>
    </v-list-item>
</template>

<script>
export default {
    name: "MapListItem",
    props: ['waypoint', 'link'],
    data: () => ({}),
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
        }
    }
}
</script>