<template>
    <v-dialog v-model="show" width="600">
        <v-card>
            <v-card-title>
                <span class="text-h5 mb-2"
                    >Add Waypoint</span
                >
            </v-card-title>
            <v-form ref="add_waypoint_form">
                <v-card-text>
                    <v-text-field
                        v-model="waypoint.name"
                        :rules="form_rules.name"
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
                                v-model="waypoint.address"
                                :rules="form_rules.required_text"
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
                                v-model="waypoint.state"
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
                                v-model="waypoint.town"
                                :rules="form_rules.required_text"
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
                                v-model="waypoint.zip"
                                label="Zip Code"
                                :rules="form_rules.basic_input_under_1000"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        v-if="waypoint.coordinates"
                    >
                        <v-col md="4">
                            <v-text-field
                                v-model="waypoint.coordinates._lat"
                                :rules="form_rules.latitude_required"
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
                                v-model="waypoint.coordinates._long"
                                :rules="form_rules.longitude_required"
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
                                v-model="waypoint.phone"
                                label="Phone"
                                :rules="form_rules.basic_input_under_1000"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="waypoint.hours"
                                label="Hours"
                                placeholder="M-F: 8a-6p, Sat-Sun: 10a-4p"
                                :rules="form_rules.basic_input_under_1000"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="waypoint.website"
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
                                v-model="waypoint.type"
                                :rules="form_rules.required_text"
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
                                v-model="waypoint.products"
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
                                v-model="waypoint.assistance_options"
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
                        @click="close()"
                        >Close</v-btn
                    >
                    <v-btn
                        text
                        @click="addItem(waypoint)"
                        >Add New Waypoint</v-btn
                    >
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { waypointFormRules } from '@/rules/waypoint.js'
import { states } from '@/data/states.js'

function default_waypoint_object() {
    return {
        state: "CT",
        coordinates: {}
    }
}
export default {
    data: () => {
        return {
            waypoint: default_waypoint_object(),
            form_rules: waypointFormRules,
            show: false,
            states: states
        }
    },
    computed: {
        ...mapGetters({
            products: 'productObjects',
            assistance_options: 'assistanceOptionsObjects',
            business_types: 'businessTypes'
        }),
    },
    methods: {
        ...mapActions([
            "addWaypoint",
        ]),
        open() {
            this.clear()
            this.show = true
        },
        close() {
            this.clear()
            this.show = false
        },
        clear() {
            this.waypoint = default_waypoint_object()
        },
        resetValidation() {
            if (this.$refs && this.$refs.add_waypoint_form) {
                this.$refs.add_waypoint_form.resetValidation()
            }
        },
        validate() {
            return this.$refs.add_waypoint_form.validate()
        },
        addItem(item) {
            let valid = this.validate()
            if (valid) {
                this.addWaypoint(item)
                    .then(() => {
                        this.clear()
                        this.$emit("successMessage", "Waypoint Created!")
                        this.close()
                    })
                    .catch((err) => {
                        this.$emit("errorMessage", err.message)
                    })
                this.close()
            }
        }
    }
}
</script>
