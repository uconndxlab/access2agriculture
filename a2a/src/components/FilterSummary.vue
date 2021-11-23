<template>
    <div class="filter-summary">
        <v-chip-group class="filter-summary-chips" color="primary" v-if="filter && filter !== {}">
            <v-chip v-if="filter.distance != 0" close @click:close="clearDistanceFilter()" color="primary">
                Distance: {{ filter.distance }} mi
            </v-chip>
            <v-chip v-for="a in assistanceOptions" :key="`fs-ao-${a.id}`" close @click:close="clearAssistanceOptionFilter(a)" color="primary">{{ a.name }}</v-chip>
            <v-chip v-for="bt in businessTypes" :key="`fs-bt-${bt}`" close @click:close="clearBusinessTypeFilter(bt)" class="white--text" :color="getColorCode(bt.color)">
                {{ bt.name }}
            </v-chip>
            <v-chip v-for="p in products" :key="`fs-p-${p.id}`" close @click:close="clearProductFilter(p)" color="primary">
                {{ p.name }}
            </v-chip>
            <v-chip v-for="r in routes" :key="`fs-r-${r.id}`" close @click:close="clearRouteFilter(r)">
                <div class="chip-color-line" :style="`background-color: #${r.route_color}`"></div>
                {{ r.name }}
            </v-chip>
        </v-chip-group>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data: () => ({}),
    computed: {
        ...mapGetters({
            filter: 'filterObject',
            assistanceOptions: 'assistanceOptionsFromFilter',
            products: 'productsFromFilter',
            getColorCode: 'colorLookup',
            businessTypes: 'businessTypeObjectsFromFilter',
            routes: 'routesFromFilter'
        })
    },
    methods: {
        ...mapMutations({
            'setFilterDistance': 'SET_FILTER_LOCATION_DISTANCE',
            'removeAssistanceOption': 'REMOVE_SINGLE_ASSISTANCE_OPTION_FILTER',
            'removeBusinessType': 'REMOVE_SINGLE_BUSINESS_TYPE_FILTER',
            'removeProduct': 'REMOVE_SINGLE_PRODUCT_FILTER',
            'removeRoute': 'REMOVE_SINGLE_ROUTE_FILTER'
        }),
        clearDistanceFilter() {
            this.setFilterDistance(0.0)
        },
        clearAssistanceOptionFilter(assistanceOption) {
            this.removeAssistanceOption(assistanceOption)
        },
        clearBusinessTypeFilter(businessType) {
            this.removeBusinessType(businessType.name)
        },
        clearProductFilter(product) {
            this.removeProduct(product)
        },
        clearRouteFilter(route) {
            this.removeRoute(route)
        }
    }
}
</script>

<style lang="scss">
.filter-summary {
    .filter-summary-chips {
        padding: 4px 8px;
        .v-chip__content {
            text-transform: none;
        }
    }
}

.chip-color-line {
    width: 15px;
    height: 6px;
    display: inline-block;
    margin-right: 5px;
    border: 1px solid black;
}
</style>