<template>
    <div id="filter-view">
        <filter-content @filterCloseSelf="handleFilterClose()"></filter-content>
    </div>
</template>

<script>
import Filter from '@/components/Filter.vue'

export default {
    name: "WaypointFilter",
    components: {
        FilterContent: Filter
    },
    methods: {
        handleFilterClose() {
            this.$router.push('/')
        }
    }
}
</script>
