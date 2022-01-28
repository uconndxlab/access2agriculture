<template>
    <div class="page-routes">
        <div class="main-content text-center">
            <h1>Routes</h1>

            <v-list>
                <v-list-item
                    v-for="r in routes"
                    :key="`rlist-${r.id}`"
                    @click="searchByRoute(r.id)"
                >
                    <v-list-item-content>
                        {{ r.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            routes: 'routeObjects'
        })
    },
    methods: {
        ...mapMutations({
            setFilter: 'SET_FILTER'
        }),
        searchByRoute(id) {
            const filter = {
                businessTypes: [],
                distance: 0.0,
                assistanceOptions: [],
                products: [],
                routes: [id]
            }
            this.setFilter(filter)
            this.$router.push('map')
        }
    }
}
</script>