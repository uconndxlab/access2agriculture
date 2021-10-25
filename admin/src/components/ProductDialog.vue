<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5 mb-2">Edit Product</span>
            </v-card-title>
            <v-card-subtitle v-if="product"> ID: {{ product.id }} </v-card-subtitle>
            <div v-if="product">
                <v-form ref="edit_product_form">
                    <v-card-text>
                        <v-text-field
                            v-model="product.name"
                            :rules="form_rules.name"
                        >
                            <template #label>
                                Name
                                <span class="red--text"><strong> *</strong></span>
                            </template>
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="close()">Close</v-btn>
                        <v-btn text @click="editProductAction(product)"
                            >Save Changes</v-btn
                        >
                    </v-card-actions>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { waypointFormRules } from "@/rules/waypoint.js"
import { mapActions } from "vuex"

export default {
    data: () => {
        return {
            show: false,
            form_rules: waypointFormRules,
            product: null,
        }
    },
    methods: {
        ...mapActions([
            "editProduct"
        ]),
        openWithProduct(product) {
            this.product = product
            this.show = true
        },
        close() {
            this.product = null
            this.show = false
        },
        editProductAction(product) {
            console.log('calling edit product')
            let valid = this.validate()
            if (valid) {
                this.editProduct(product)
                    .then(() => {
                        this.$emit('successMessage', 'Product Edited Successfully!')
                        this.close()
                    })
                    .catch((err) => {
                        this.$emit('errorMessage', err.message)
                    })
                this.close()
            }
        },
        validate() {
            return this.$refs.edit_product_form.validate()
        },
        resetValidation() {
            if (this.$refs && this.$refs.edit_product_form) {
                this.$refs.edit_product_form.resetValidation()
            }
        },
    },
}
</script>