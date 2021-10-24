<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="action-icon" icon fab @click="toggleEdit()" v-bind="attrs" v-on="on">
                        <v-icon>{{ icon }}</v-icon>
                    </v-btn>
                </template>
                <span>{{ iconTooltipText }}</span>
            </v-tooltip>
            

            <v-card-title>
                <span class="text-h5">{{ cardTitle }}</span>
            </v-card-title>

            <div v-if="waypoint">
                <v-divider v-if="!editing"></v-divider>
                <v-card-subtitle v-if="editing">
                    ID: {{ waypoint.id }}
                </v-card-subtitle>
                <v-form ref="edit_waypoint_form">

                    <!-- Name Field.  The Read version is the title of the card. -->
                    <v-card-text v-if="editing">
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

                    <v-card-title>Location</v-card-title>
                    <v-card-text>

                        <!-- Address Field -->
                        <v-row>
                            <v-col>
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Address
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.address }}
                                </div>

                                <v-text-field
                                    v-model="waypoint.address"
                                    label="Street Address"
                                    :rules="form_rules.required_text"
                                    v-if="editing"
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
                            <!-- US State Field -->
                            <v-col cols="12" sm="6" md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    State
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.state }}
                                </div>

                                <v-select
                                    :items="states"
                                    v-model="waypoint.state"
                                    v-if="editing"
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

                            <!-- Town Field -->
                            <v-col cols="12" sm="6" md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Town
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.town }}
                                </div>

                                <v-text-field
                                    v-model="waypoint.town"
                                    :rules="form_rules.required_text"
                                    v-if="editing"
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

                            <!-- Zip Code Field -->
                            <v-col cols="12" sm="6" md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Zip Code
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.zip }}
                                </div>

                                <v-text-field
                                    v-model="waypoint.zip"
                                    label="Zip Code"
                                    :rules="form_rules.basic_input_under_1000"
                                    v-if="editing"
                                ></v-text-field>
                            </v-col>

                        </v-row>


                        <v-row v-if="waypoint.coordinates">
                            <!-- Latitude Field -->
                            <v-col md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Latitude
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.coordinates._lat }}
                                </div>
                                <v-text-field
                                    v-model="waypoint.coordinates._lat"
                                    :rules="form_rules.latitude_required"
                                    label="Latitude"
                                    v-if="editing"
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

                            <!-- Longitude Field -->
                            <v-col md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Longitude
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.coordinates._long }}
                                </div>

                                <v-text-field
                                    v-model="waypoint.coordinates._long"
                                    :rules="form_rules.longitude_required"
                                    label="Longitude"
                                    v-if="editing"
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

                            <!-- Google Maps Link -->
                            <v-col md="4" v-if="waypoint_google_maps_link">
                                <a :href="waypoint_google_maps_link" target="_blank"
                                    >View on Google Maps</a
                                >
                            </v-col>
                        </v-row>
                    </v-card-text>


                    <v-divider></v-divider>


                    <v-card-title>Contact</v-card-title>
                    <v-card-text>
                        <v-row>

                            <!-- Phone Field -->
                            <v-col cols="12" sm="6" md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Phone
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.phone }}
                                </div>
                                <v-text-field
                                    v-model="waypoint.phone"
                                    label="Phone"
                                    :rules="form_rules.basic_input_under_1000"
                                    v-if="editing"
                                ></v-text-field>
                            </v-col>

                            <!-- Hours Field -->
                            <v-col cols="12" sm="6" md="6">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Hours
                                </div>
                                <div class="text-body-2" v-if="waypoint.hours && !editing">
                                    {{ waypoint.hours }}
                                </div>
                                <div class="text-body-2" v-if="!waypoint.hours && !editing">
                                    No hours listed.
                                </div>

                                <v-text-field
                                    v-model="waypoint.hours"
                                    label="Hours"
                                    placeholder="M-F: 8a-6p, Sat-Sun: 10a-4p"
                                    :rules="form_rules.basic_input_under_1000"
                                    v-if="editing"
                                ></v-text-field>
                            </v-col>

                            <!-- Website Field -->
                            <v-col cols="12">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Website
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    <a :href="waypoint.website">{{
                                        waypoint.website
                                    }}</a>
                                </div>
                                <v-text-field
                                    v-model="waypoint.website"
                                    label="Website"
                                    v-if="editing"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>


                    <v-divider></v-divider>
                    <v-card-title>Metadata</v-card-title>
                    <v-card-text>

                        <!-- Business Type Field -->
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                    Type
                                </div>
                                <div class="text-body-2" v-if="!editing">
                                    {{ waypoint.type }}
                                </div>
                                <v-select
                                    :items="business_types"
                                    v-model="waypoint.type"
                                    :rules="form_rules.required_text"
                                    v-if="editing"
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

                        <!-- Products Field -->
                        <v-row>
                            <v-col>
                                <div v-if="!editing">
                                    <div class="text-subtitle-1 font-weight-bold" v-if="!editing">
                                        Products
                                    </div>
                                    <v-chip
                                        v-for="product in waypoint_products"
                                        :key="product.id"
                                        class="mr-2"
                                        >{{ product.name }}</v-chip
                                    >
                                    <p v-if="waypoint_products.length === 0">
                                        No products.
                                    </p>
                                </div>
                                <div v-if="editing">
                                    <v-select
                                        :items="products"
                                        v-model="waypoint.products"
                                        item-value="id"
                                        item-text="name"
                                        label="Products"
                                        multiple
                                        chips
                                    ></v-select>
                                </div>
                            </v-col>
                        </v-row>

                        <!-- Assistance Options Field -->
                        <v-row>
                            <v-col>
                                <div v-if="!editing">
                                    <div class="text-subtitle-1 font-weight-bold">
                                        Assistance Options
                                    </div>
                                    <v-chip
                                        v-for="opt in waypoint_assistance_options"
                                        :key="opt.id"
                                        class="mr-2"
                                        >{{ opt.name }}</v-chip
                                    >
                                    <p v-if="waypoint_assistance_options.length === 0">
                                        No options.
                                    </p>
                                </div>
                                <div v-if="editing">
                                    <v-select
                                        :items="assistance_options"
                                        v-model="waypoint.assistance_options"
                                        item-value="id"
                                        item-text="name"
                                        label="Assistance Options"
                                        multiple
                                        chips
                                    ></v-select>
                                </div>
                            </v-col>
                        </v-row>


                        <!-- Routes Field -->
                        <v-row>
                            <v-col>
                                <div v-if="!editing">
                                    <div class="text-subtitle-1 font-weight-bold">
                                        Route(s)
                                    </div>
                                    <v-chip
                                        v-for="r in waypoint_routes"
                                        :key="`rs-${r.id}`"
                                        class="mr-2"
                                    >{{ r.name }}</v-chip>
                                    <p v-if="waypoint_routes.length === 0">
                                        No routes.
                                    </p>
                                </div>
                                <div v-if="editing">
                                    <v-select
                                        :items="routes"
                                        v-model="waypoint.routes"
                                        item-value="id"
                                        item-text="name"
                                        label="Routes"
                                        multiple
                                        chips
                                    ></v-select>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>


                    <v-divider></v-divider>
                    <v-card-title>Photo / Presentation</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-img
                                    :src="waypoint.image"
                                    max-width="300"
                                    v-if="waypoint.image"
                                ></v-img>
                                <p v-else>No image.</p>
                                <v-btn
                                    @click="openImageEditor()"
                                    v-if="editing"
                                >Edit Image</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-form>
                
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn text @click="close()">Close</v-btn>
                    <v-btn
                        text
                        @click="saveItem(waypoint)"
                        v-if="editing"
                        >Save Changes</v-btn
                    >
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { waypointFormRules } from '@/rules/waypoint.js'
import { states } from '@/data/states.js'

export default {
    data: () => {
        return {
            waypoint: null,
            editing: false,
            show: false,
            form_rules: waypointFormRules,
            states: states
        };
    },
    computed: {
        ...mapGetters({
            products: 'productObjects',
            assistance_options: 'assistanceOptionsObjects',
            business_types: 'businessTypes',
            routes: 'routeObjects'
        }),
        icon() {
            if ( this.editing ) {
                return 'mdi-eye'
            }
            return 'mdi-pencil'
        },
        iconTooltipText() {
            if ( this.editing ) {
                return 'View Waypoint'
            }
            return 'Edit Waypoint'
        },
        cardTitle() {
            if (this.waypoint && this.waypoint.name) {
                if (this.editing) {
                    return "Edit Waypoint";
                }
                return this.waypoint.name;
            }
            return "Error: No Waypoint Data";
        },
        waypoint_google_maps_link() {
            if (
                this.waypoint.coordinates &&
                this.waypoint.coordinates._lat &&
                this.waypoint.coordinates._long
            ) {
                return (
                    "https://maps.google.com?q=" +
                    this.waypoint.coordinates._lat +
                    "," +
                    this.waypoint.coordinates._long
                );
            }
            return "";
        },
        waypoint_products() {
            if (this.waypoint.products && this.products) {
                return this.products.filter((prod) => {
                    if (this.waypoint.products.includes(prod.id)) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            return [];
        },
        waypoint_routes() {
            if ( this.waypoint.routes && this.routes ) {
                return this.routes.filter((r) => {
                    if ( this.waypoint.routes.includes(r.id)) {
                        return true
                    }
                    return false
                })
            }
            return []
        },
        waypoint_assistance_options() {
            if (
                this.waypoint.assistance_options &&
                this.assistance_options
            ) {
                return this.assistance_options.filter((opt) => {
                    if (
                        this.waypoint.assistance_options.includes(opt.id)
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            return [];
        },
    },
    methods: {
        ...mapActions([
            "editWaypoint",
        ]),
        assignWaypoint(waypoint, edit = false) {
            console.log(waypoint)
            this.editing = edit;
            this.waypoint = waypoint;
            this.show = true;
        },
        close() {
            this.show = false;
            this.editing = false;
            this.waypoint = null;
            this.editWaypointFormResetValidation();
        },
        toggleEdit() {
            this.editing = !this.editing
        },
        openImageEditor() {
            this.$emit('openImageUploader', this.waypoint)
            this.close()
        },
        saveItem(item) {
            let valid = this.validateEditWaypointForm();
            if (valid) {
                this.editWaypoint(item)
                    .then(() => {
                        this.$emit('successMessage', 'Waypoint Edited Successfully!')
                        this.close();
                    })
                    .catch((err) => {
                        this.$emit('errorMessage', err.message)
                    });
                this.close();
            }
        },
        validateEditWaypointForm() {
            return this.$refs.edit_waypoint_form.validate();
        },
        editWaypointFormResetValidation() {
            if (this.$refs && this.$refs.edit_waypoint_form) {
                this.$refs.edit_waypoint_form.resetValidation();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.action-icon {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 8px;
    margin-top: 3px;
}
</style>