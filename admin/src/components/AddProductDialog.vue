<template>
    <v-dialog v-model="show" width="600">
        <v-card>
            <v-card-title>
                <span class="text-h5 mb-2">Add Product</span>
            </v-card-title>
            <v-form ref="add_product_form">
                <v-card-text>
                    <v-text-field
                        v-model="product.name"
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
                    <v-btn
                        text
                        @click="addProductAction(product)"
                        >Add New Product</v-btn
                    >
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { waypointFormRules } from '@/rules/waypoint.js'
function default_add_product() {
    return {
        name: ''
    }
}

export default {
    data: () => {
        return {
            show: false,
            product: default_add_product(),
            form_rules: waypointFormRules
        }
    },
    methods: {
        ...mapActions(['addProduct']),
        open() {
            this.product = default_add_product()
            this.show = true
        },
        close() {
            this.product = default_add_product()
            this.resetValidation()
            this.show = false
        },
        addProductAction(product) {
            let valid = this.validate();
            if (valid) {
                this.addProduct(product)
                    .then(() => {
                        this.$emit('successMessage', 'Product Created!')
                        this.close()
                    })
                    .catch((error) => {
                        this.$emit('errorMessage', error.message)
                        this.close()
                    });
            }
        },
        validate() {
            return this.$refs.add_product_form.validate();
        },
        resetValidation() {
            if (this.$refs && this.$refs.add_product_form) {
                this.$refs.add_product_form.resetValidation();
            }
        }
    }
}
</script>

