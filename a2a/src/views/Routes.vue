<template>
    <div class="page-routes">
        <div class="main-content">
            <h1>Routes</h1>

            <v-list>
                <v-list-item
                    v-for="r in routes"
                    :key="`rlist-${r.id}`"
                    @click="$router.push('map')"
                >
                    <v-list-item-content>
                        {{ r.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            {{ routes }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            routes: 'routeObjects'
        })
    }
}
</script>