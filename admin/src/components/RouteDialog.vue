<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5 mb-2">Edit Route</span>
            </v-card-title>
        
            <v-card-subtitle v-if="route && route.id">ID: {{ route.id }}</v-card-subtitle>
            <div v-if="route">
                <v-form ref="edit_route_form">
                    <v-card-text>
                        <v-text-field
                            v-model="route.name"
                            :rules="form_rules.name"
                        >
                            <template #label>
                                Name
                                <span class="red--text"><strong> *</strong></span>
                            </template>
                        </v-text-field>

                        <span class="text-h6 mb-2">Route Color</span>
                        <v-color-picker
                            dot-size="25"
                            mode="hexa"
                            :value="route.route_color"
                            @update:color="colorUpdate"
                        ></v-color-picker>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="close()">Close</v-btn>
                        <v-spacer />
                        <v-btn text @click="editRouteAction(route)">
                            Save Changes
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { waypointFormRules } from '@/rules/waypoint.js'

export default {
    data: () => {
        return {
            show: false,
            form_rules: waypointFormRules,
            route: null
        }
    },
    methods: {
        ...mapActions(['editRoute']),
        openWithRoute(route) {
            this.route = route
            this.show = true
        },
        close() {
            this.route = null,
            this.show = false
        },
        editRouteAction(route) {
            let valid = this.validate()
            if ( valid ) {
                this.editRoute(route)
                    .then(() => {
                        this.$emit('successMessage', 'Route Edited Successfully!')
                        this.close()
                    })
                    .catch((err) => {
                        this.$emit('errorMessage', err.message)
                        this.close()
                    })
            }
        },
        validate() {
            return this.$refs.edit_route_form.validate()
        },
        resetValidation() {
            if ( this.$refs && this.$refs.edit_route_form ) {
                this.$refs.edit_route_form.resetValidation()
            }
        },
        colorUpdate(e) {
            // Currently removing the '#' ... sorry
            this.route.route_color = e.hex.substring(1)
        }
    }
}
</script>