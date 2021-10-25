<template>
    <div class="about mt-3">
        <v-container>
            <v-row justify="center">
                <v-col md="10">
                    <h1 class="display-1 font-weight-black mb-3">
                        Waypoints Dashboard
                    </h1>
                </v-col>
            </v-row>

            <waypoint-image-uploader ref="waypoint_image_uploader" />

            <v-row justify="center">
                <v-col md="10">
                    <v-card>
                        <v-card-title>
                            Waypoints
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="waypoint_search"
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
                                @click="newItem()"
                                >New Waypoint</v-btn
                            >
                        </v-card-title>

                        <waypoint-dialog
                            ref="waypoint_fullcard"
                            @successMessage="showSuccessMessage"
                            @errorMessage="showErrorMessage"
                            @openImageUploader="openWaypointImageUploader"
                        ></waypoint-dialog>

                        <waypoint-new-dialog
                            ref="waypoint_new_dialog"
                            @successMessage="showSuccessMessage"
                            @errorMessage="showErrorMessage"
                        ></waypoint-new-dialog>

                        <v-data-table
                            :search="waypoint_search"
                            :headers="waypoint_headers"
                            :items="waypoints"
                        >
                            <template v-slot:[`item.website`]="{ item }">
                                <v-chip
                                    :href="item.website"
                                    v-if="item.website"
                                    target="_blank"
                                    color="primary"
                                    outlined
                                >
                                    <v-icon left>mdi-open-in-new</v-icon>
                                    Visit Website</v-chip
                                >
                                <div v-else>No website.</div>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="mr-2" @click="viewItem(item)"
                                    >mdi-eye</v-icon
                                >
                                <v-icon class="mr-2" @click="editItem(item)"
                                    >mdi-pencil</v-icon
                                >
                                <v-icon
                                    class="mr-2"
                                    @click="openWaypointImageUploader(item)"
                                    >mdi-image-edit</v-icon
                                >
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col md="5">
                    <v-alert
                        type="warning"
                        class="mb-2"
                        v-if="show_not_finished_yet"
                        >Sorry, this isn't completed yet.</v-alert
                    >
                    <v-alert type="success" v-if="show_success_message">{{
                        success_message_text
                    }}</v-alert>
                    <v-alert type="error" v-if="show_error_message">{{
                        error_message_text
                    }}</v-alert>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from "vuex"
import WaypointImageUploader from "@/components/WaypointImageUploader.vue"
import WaypointDialog from "@/components/WaypointDialog.vue"
import WaypointNewDialog from "@/components/WaypointNewDialog.vue"
import { deepCloneWaypoint } from "@/helpers/deepClone.js"

export default {
    components: {
        WaypointImageUploader,
        WaypointDialog,
        WaypointNewDialog
    },
    data: () => ({
        show_not_finished_yet: false,
        show_success_message: false,
        success_message_text: "",
        show_error_message: false,
        error_message_text: "",
        waypoint_search: "",
        waypoint_headers: [
            {
                text: "Name",
                align: "start",
                value: "name",
            },
            {
                text: "Type",
                value: "type",
            },
            {
                text: "Town",
                value: "town",
            },
            {
                text: "State",
                value: "state",
            },
            {
                text: "Website",
                value: "website",
            },
            {
                text: "Actions",
                value: "actions",
                sortable: false,
            },
        ]
    }),
    computed: {
        ...mapState({
            business_types: (state) => state.business_types,
        }),
        ...mapGetters({
            // This is a getter because deep object properties can be updated and need to be handled with Vue.set for reactivity
            products: "productObjects",
            waypoints: "waypointObjects",
            assistance_options: "assistanceOptionsObjects",
        })
    },
    methods: {
        ...mapActions([
            "fetchProducts",
            "fetchWaypoints",
            "fetchAssistanceOptions",
            "fetchRoutes"
        ]),
        openWaypointImageUploader(waypoint) {
            this.closeWaypointDialogs()
            this.$refs.waypoint_image_uploader.openWaypoint(waypoint)
        },
        viewItem(item) {
            this.closeWaypointDialogs()
            this.$refs.waypoint_fullcard.assignWaypoint(
                deepCloneWaypoint(item)
            )
        },
        editItem(item) {
            this.closeWaypointDialogs()
            this.$refs.waypoint_fullcard.assignWaypoint(
                deepCloneWaypoint(item),
                true
            )
        },
        newItem() {
            this.closeWaypointDialogs()
            this.$refs.waypoint_new_dialog.open()
        },
        showNotFinishedMessage() {
            this.clearMessages()
            setTimeout(() => {
                this.show_not_finished_yet = true
            }, 100)
        },
        showSuccessMessage(message) {
            this.clearMessages()
            this.success_message_text = message
            this.show_success_message = true
        },
        showErrorMessage(error_message) {
            this.clearMessages()
            this.error_message_text = error_message
            this.show_error_message = true
        },
        closeWaypointDialogs() {
            this.$refs.waypoint_fullcard.close()
            this.$refs.waypoint_new_dialog.close()
        },
        clearMessages() {
            this.show_not_finished_yet = false
            this.show_success_message = false
            this.show_error_message = false
        }
    },
    mounted() {
        this.fetchProducts()
        this.fetchWaypoints()
        this.fetchAssistanceOptions()
        this.fetchRoutes()
    },
}
</script>

<style scoped>
.white-space-normal {
    white-space: normal;
}
</style>