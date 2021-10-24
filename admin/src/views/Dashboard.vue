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

                        <v-dialog v-model="add_waypoint_dialog" width="600">
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5 mb-2"
                                        >Add Waypoint</span
                                    >
                                </v-card-title>
                                <v-form ref="add_waypoint_form">
                                    <v-card-text>
                                        <v-text-field
                                            v-model="adding_waypoint.name"
                                            :rules="
                                                add_waypoint_form_rules.name
                                            "
                                        >
                                            <template #label>
                                                Name
                                                <span class="red--text"
                                                    ><strong> *</strong></span
                                                >
                                            </template>
                                        </v-text-field>
                                    </v-card-text>
                                    <!-- <v-divider></v-divider> -->
                                    <v-card-title>Location</v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint.address
                                                    "
                                                    :rules="
                                                        add_waypoint_form_rules.required_text
                                                    "
                                                >
                                                    <template #label>
                                                        Street Address
                                                        <span class="red--text"
                                                            ><strong>
                                                                *</strong
                                                            ></span
                                                        >
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select
                                                    :items="states"
                                                    v-model="
                                                        adding_waypoint.state
                                                    "
                                                >
                                                    <template #label>
                                                        State
                                                        <span class="red--text"
                                                            ><strong>
                                                                *</strong
                                                            ></span
                                                        >
                                                    </template>
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint.town
                                                    "
                                                    :rules="
                                                        add_waypoint_form_rules.required_text
                                                    "
                                                >
                                                    <template #label>
                                                        Town
                                                        <span class="red--text"
                                                            ><strong>
                                                                *</strong
                                                            ></span
                                                        >
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint.zip
                                                    "
                                                    label="Zip Code"
                                                    :rules="
                                                        add_waypoint_form_rules.basic_input_under_1000
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row
                                            v-if="adding_waypoint.coordinates"
                                        >
                                            <v-col md="4">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint
                                                            .coordinates._lat
                                                    "
                                                    :rules="
                                                        add_waypoint_form_rules.latitude_required
                                                    "
                                                    required
                                                    placeholder="41.71403"
                                                >
                                                    <template #label>
                                                        Latitude
                                                        <span class="red--text"
                                                            ><strong>
                                                                *</strong
                                                            ></span
                                                        >
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col md="4">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint
                                                            .coordinates._long
                                                    "
                                                    :rules="
                                                        add_waypoint_form_rules.longitude_required
                                                    "
                                                    required
                                                    placeholder="-72.21541"
                                                >
                                                    <template #label>
                                                        Longitude
                                                        <span class="red--text"
                                                            ><strong>
                                                                *</strong
                                                            ></span
                                                        >
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col md="4">
                                                <a
                                                    href="https://www.latlong.net/"
                                                    target="_blank"
                                                    >Help Finding
                                                    Latitude/Longitude?</a
                                                >
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <!-- <v-divider></v-divider> -->
                                    <v-card-title>Contact</v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint.phone
                                                    "
                                                    label="Phone"
                                                    :rules="
                                                        add_waypoint_form_rules.basic_input_under_1000
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint.hours
                                                    "
                                                    label="Hours"
                                                    placeholder="M-F: 8a-6p, Sat-Sun: 10a-4p"
                                                    :rules="
                                                        add_waypoint_form_rules.basic_input_under_1000
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="
                                                        adding_waypoint.website
                                                    "
                                                    label="Website"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <!-- <v-divider></v-divider> -->
                                    <v-card-title>Metadata</v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    :items="business_types"
                                                    v-model="
                                                        adding_waypoint.type
                                                    "
                                                    :rules="
                                                        add_waypoint_form_rules.required_text
                                                    "
                                                >
                                                    <template #label>
                                                        Business Type
                                                        <span class="red--text"
                                                            ><strong>
                                                                *</strong
                                                            ></span
                                                        >
                                                    </template>
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-select
                                                    :items="products"
                                                    v-model="
                                                        adding_waypoint.products
                                                    "
                                                    item-value="id"
                                                    item-text="name"
                                                    label="Products"
                                                    multiple
                                                    chips
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-select
                                                    :items="assistance_options"
                                                    v-model="
                                                        adding_waypoint.assistance_options
                                                    "
                                                    item-value="id"
                                                    item-text="name"
                                                    label="Assistance Options"
                                                    multiple
                                                    chips
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-btn
                                            text
                                            @click="closeWaypointDialogs()"
                                            >Close</v-btn
                                        >
                                        <v-btn
                                            text
                                            @click="addItem(adding_waypoint)"
                                            >Add New Waypoint</v-btn
                                        >
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </v-dialog>

                        <waypoint-dialog
                            ref="waypoint_fullcard"
                            @successMessage="showSuccessMessage"
                            @errorMessage="showErrorMessage"
                            @openImageUploader="openWaypointImageUploader"
                        ></waypoint-dialog>

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
import { mapActions, mapState, mapGetters } from "vuex";
import WaypointImageUploader from "@/components/WaypointImageUploader.vue";
import WaypointDialog from "@/components/WaypointDialog.vue";
import { waypointFormRules } from "@/rules/waypoint.js"
import { deepCloneWaypoint } from "@/helpers/deepClone.js"
import { states } from '@/data/states.js'

export default {
    components: {
        WaypointImageUploader,
        WaypointDialog,
    },
    data: () => ({
        add_waypoint_dialog: false,
        adding_waypoint: {},
        default_adding_waypoint_object: {
            state: "CT",
            coordinates: {},
        },
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
        ],
        states: states,
        add_waypoint_form_rules: waypointFormRules,
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
            "addWaypoint",
        ]),
        openWaypointImageUploader(waypoint) {
            this.closeWaypointDialogs();
            this.$refs.waypoint_image_uploader.openWaypoint(waypoint);
        },
        viewItem(item) {
            this.closeWaypointDialogs();
            this.$refs.waypoint_fullcard.assignWaypoint(
                deepCloneWaypoint(item)
            );
        },
        editItem(item) {
            this.closeWaypointDialogs();
            this.$refs.waypoint_fullcard.assignWaypoint(
                deepCloneWaypoint(item),
                true
            );
        },
        newItem() {
            this.closeWaypointDialogs();
            this.add_waypoint_dialog = true;
        },
        addItem(item) {
            let valid = this.validateAddWaypointForm();
            if (valid) {
                this.addWaypoint(item)
                    .then(() => {
                        this.clearAddWaypointObject();
                        this.showSuccessMessage("Waypoint Created!");
                        this.closeWaypointDialogs();
                    })
                    .catch((err) => {
                        this.showErrorMessage(err.message);
                    });
                this.closeWaypointDialogs();
            }
        },
        showNotFinishedMessage() {
            this.clearMessages();
            setTimeout(() => {
                this.show_not_finished_yet = true;
            }, 100);
        },
        showSuccessMessage(message) {
            this.clearMessages();
            this.success_message_text = message;
            this.show_success_message = true;
        },
        showErrorMessage(error_message) {
            this.clearMessages();
            this.error_message_text = error_message;
            this.show_error_message = true;
        },
        closeWaypointDialogs() {
            this.add_waypoint_dialog = false;
            this.addWaypointFormResetValidation();

            this.$refs.waypoint_fullcard.close();
        },
        clearMessages() {
            this.show_not_finished_yet = false;
            this.show_success_message = false;
            this.show_error_message = false;
        },
        validateAddWaypointForm() {
            return this.$refs.add_waypoint_form.validate();
        },
        addWaypointFormResetValidation() {
            if (this.$refs && this.$refs.add_waypoint_form) {
                this.$refs.add_waypoint_form.resetValidation();
            }
        },
        clearAddWaypointObject() {
            this.adding_waypoint = {
                ...this.default_adding_waypoint_object,
                coordinates: {
                    ...this.default_adding_waypoint_object.coordinates,
                },
            };
        },
    },
    mounted() {
        this.fetchProducts();
        this.fetchWaypoints();
        this.fetchAssistanceOptions();
        this.clearAddWaypointObject();
    },
};
</script>

<style scoped>
.white-space-normal {
    white-space: normal;
}
</style>