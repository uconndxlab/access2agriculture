<template>
    <div class="filter-summary">
        <v-chip-group class="filter-summary-chips" color="primary" v-if="filter && filter !== {}">
            <v-chip v-if="filter.distance != 0" close @click:close="clearDistanceFilter()" color="primary">
                Distance: {{ filter.distance }} mi
            </v-chip>
            <v-chip v-for="a in assistanceOptions" :key="`fs-ao-${a.id}`" close @click:close="clearAssistanceOptionFilter(a)" color="primary">{{ a.name }}</v-chip>
            <v-chip v-for="bt in filter.businessTypes" :key="`fs-bt-${bt}`" close @click:close="clearBusinessTypeFilter(bt)" color="primary">
                {{ bt }}
            </v-chip>
            <v-chip v-for="p in products" :key="`fs-p-${p.id}`" close @click:close="clearProductFilter(p)" color="primary">
                {{ p.name }}
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
            products: 'productsFromFilter'
        })
    },
    methods: {
        ...mapMutations({
            'setFilterDistance': 'SET_FILTER_LOCATION_DISTANCE',
            'removeAssistanceOption': 'REMOVE_SINGLE_ASSISTANCE_OPTION_FILTER',
            'removeBusinessType': 'REMOVE_SINGLE_BUSINESS_TYPE_FILTER',
            'removeProduct': 'REMOVE_SINGLE_PRODUCT_FILTER'
        }),
        clearDistanceFilter() {
            this.setFilterDistance(0.0)
        },
        clearAssistanceOptionFilter(assistanceOption) {
            this.removeAssistanceOption(assistanceOption)
        },
        clearBusinessTypeFilter(businessType) {
            this.removeBusinessType(businessType)
        },
        clearProductFilter(product) {
            this.removeProduct(product)
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
</style>