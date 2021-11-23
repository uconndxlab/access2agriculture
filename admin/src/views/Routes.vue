<template>
    <v-container class="mt-3">

        <v-row justify="center">
            <v-col md="10">
                <h1 class="display-1 font-weight-black mb-3">Routes</h1>
                <p>Right now, routes can only be added by a developer, since they might require new route files to be generated.  Certain properties can be modified here, though.</p>
            </v-col>
        </v-row>

        <route-dialog
            ref="edit_route_dialog"
            @successMessage="showSuccessMessage"
            @errorMessage="showErrorMessage"
        ></route-dialog>

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
                    <v-data-table
                        :headers="route_headers"
                        :items="routes"
                        :search="route_search"
                    >
                        <template v-slot:[`item.route_color`]="{ item }">
                            <div class="color-circle" :style="`background-color: #${item.route_color}`"></div>
                            #{{ item.route_color }}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon class="mr-2" @click="editRoute(item)">mdi-pencil</v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col md="10">
                <v-alert type="success" v-if="show_success_message">{{
                    success_message_text
                }}</v-alert>
                <v-alert type="error" v-if="show_error_message">{{
                    error_message_text
                }}</v-alert>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { deepCloneRoute } from '@/helpers/deepClone.js'
import RouteDialog from '@/components/RouteDialog.vue'

export default {
    components: {
        RouteDialog
    },
    data: () => {
        return {
            route_search: '',
            route_headers: [
                {
                    text: "Name",
                    align: "start",
                    value: "name"
                },
                {
                    text: "Map Route Color",
                    value: "route_color",
                    sortable: false
                },
                {
                    text: "Mapbox Data Source",
                    value: "source"
                },
                {
                    text: "Route Short Name",
                    value: "route_short_name",
                    sortable: false
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "end"
                }
            ],
            show_success_message: false,
            show_error_message: false,
            success_message_text: '',
            error_message_text: ''
        }
    },
    computed: {
        ...mapGetters({
            routes: "routeObjects"
        })
    },
    methods: {
        ...mapActions([ 'fetchRoutes' ]),
        editRoute(route) {
            this.closeDialogs()
            this.$refs.edit_route_dialog.openWithRoute(
                deepCloneRoute(route)
            )
        },
        closeDialogs() {
            this.$refs.edit_route_dialog.close()
        },
        clearMessages() {
            this.show_success_message = false
            this.show_error_message = false
        },
        showSuccessMessage(message) {
            this.clearMessages()
            this.success_message_text = message
            this.show_success_message = true
        },
        showErrorMessage(message) {
            this.clearMessages()
            this.error_message_text = message
            this.show_error_message = true
        }
    },
    mounted() {
        this.fetchRoutes()
    }
}
</script>

<style lang="scss" scoped>
.color-circle {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
</style>