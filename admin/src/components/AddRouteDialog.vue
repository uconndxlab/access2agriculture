<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5 mb-2">Add Route</span>
            </v-card-title>
            
            <v-form ref="add_route_form">
                <v-card-text>
                    <v-text-field
                        v-model="route.name"
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
                <v-card-actions>
                    <v-btn text @click="close()"
                        >Close</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="addRouteAction(route)"
                        >Add New Route</v-btn
                    >
                </v-card-actions>
                
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { waypointFormRules } from '@/rules/waypoint.js'

function default_route_object() {
    return {
        name: ''
    }
    
}

export default {
    data: () => {
        return {
            show: false,
            route: default_route_object(),
            form_rules: waypointFormRules
        }
    },
    methods: {
        ...mapActions(['addRoute']),
        open() {
            this.route = default_route_object()
            this.show = true
        },
        close() {
            this.route = default_route_object()
            this.resetValidation()
            this.show = false
        },
        addRouteAction(route) {
            let valid = this.validate()
            if ( valid ) {
                this.addRoute(route)
                    .then(() => {
                        this.$emit('successMessage', 'Route created!')
                        this.close()
                    })
                    .catch((err) => {
                        this.$emit('errorMessage', err.message)
                        this.close()
                    })
            }
        },
        validate() {
            return this.$refs.add_route_form.validate()
        },
        resetValidation() {
            if (this.$refs && this.$refs.add_route_form) {
                this.$refs.add_route_form.resetValidation()
            }
        }
    }
    
}
</script>