<template>
    <v-container class="mt-3">

        <v-row justify="center">
            <v-col md="10">
                <h1 class="display-1 font-weight-black mb-3">Routes</h1>
            </v-col>
        </v-row>

        <route-dialog
            ref="edit_route_dialog"
            @successMessage="showSuccessMessage"
            @errorMessage="showErrorMessage"
        ></route-dialog>

        <add-route-dialog
            ref="add_route_dialog"
            @successMessage="showSuccessMessage"
            @errorMessage="showErrorMessage"
        ></add-route-dialog>

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
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            @click="addRoute()"
                            >New Route</v-btn
                        >
                    </v-card-title>
                    <v-data-table
                        :headers="route_headers"
                        :items="routes"
                        :search="route_search"
                    >
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
import AddRouteDialog from '@/components/AddRouteDialog.vue'

export default {
    components: {
        RouteDialog,
        AddRouteDialog
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
        addRoute() {
            this.$refs.add_route_dialog.open()
        },
        closeDialogs() {
            this.$refs.edit_route_dialog.close()
            this.$refs.add_route_dialog.close()
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