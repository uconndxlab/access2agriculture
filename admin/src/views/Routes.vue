<template>
    <v-container class="mt-3">

        <v-row justify="center">
            <v-col md="10">
                <h1 class="display-1 font-weight-black mb-3">Routes</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col md="10">
                <v-card>
                    <v-card-title>
                        Routes
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="route_search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<script>
export default {
    data: () => {
        return {
            route_search: ''
        }
    }
}
</script>