<template>
    <v-container class="mt-3">
        <v-row justify="center">
            <v-col md="10">
                <h1 class="display-1 font-weight-black mb-3">Products</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col md="10">
                <v-card>
                    <v-card-title>
                        Products
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="product_search"
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
                            @click="newProductOpen()"
                            >New Product</v-btn
                        >
                    </v-card-title>
                    <v-data-table
                        :items="products"
                        :headers="product_headers"
                        :search="product_search"
                    >
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon class="mr-2" @click="editProductOpen(item)"
                                >mdi-pencil</v-icon
                            >
                        </template>
                    </v-data-table>
                </v-card>

                <product-edit-dialog ref="edit_product_dialog"
                    @successMessage="showSuccessMessage"
                    @errorMessage="showErrorMessage"
                ></product-edit-dialog>

                <add-product-dialog ref="add_product_dialog"
                    @successMessage="showSuccessMessage"
                    @errorMessage="showErrorMessage"
                ></add-product-dialog>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col md="10">
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
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import ProductDialog from "@/components/ProductDialog.vue"
import AddProductDialog from "@/components/AddProductDialog.vue"
import { deepCloneProduct } from "@/helpers/deepClone.js"

export default {
    components: {
        'product-edit-dialog': ProductDialog,
        AddProductDialog
    },
    data: () => ({
        show_not_finished_yet: false,
        show_success_message: false,
        success_message_text: "",
        show_error_message: false,
        error_message_text: "",
        product_headers: [
            {
                text: "Name",
                align: "start",
                value: "name",
            },
            {
                text: "Actions",
                value: "actions",
                sortable: false,
                align: "end",
            },
        ],
        product_search: ""
    }),
    computed: {
        ...mapGetters({
            // This is a getter because deep object properties can be updated and need to be handled with Vue.set for reactivity
            products: "productObjects",
        }),
    },
    methods: {
        ...mapActions(["fetchProducts"]),
        newProductOpen() {
            this.closeWaypointDialogs()
            this.$refs.add_product_dialog.open()
        },
        editProductOpen(product) {
            this.closeWaypointDialogs()
            this.$refs.edit_product_dialog.openWithProduct(
                deepCloneProduct(product)
            )
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
            this.$refs.add_product_dialog.close()
            this.$refs.edit_product_dialog.close()
        },
        clearMessages() {
            this.show_not_finished_yet = false
            this.show_success_message = false
            this.show_error_message = false
        }
    },
    mounted() {
        this.fetchProducts()
    },
}
</script>

<style scoped>
</style>