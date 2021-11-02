<template>
    <div class="no-locations-alert" v-if="show">
        <slot></slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        filtered: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            waypoints: 'waypointObjects',
            waypointsFiltered: 'waypointObjectsByFilter'
        }),
        show() {
            if ( this.filtered ) {
                return this.waypointsFiltered.length > 0
            }
            return this.waypoints.length > 0 && this.waypointsFiltered.length === 0
        }
    }
}
</script>