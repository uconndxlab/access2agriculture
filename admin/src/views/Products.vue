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
              >New Product</v-btn>
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

        <v-dialog v-model="edit_product_dialog" width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5 mb-2">Edit Product</span>
            </v-card-title>
            <v-card-subtitle> ID: {{ editing_product.id }} </v-card-subtitle>
            <v-form ref="edit_product_form" lazy-validation>
              <v-card-text>
                <v-text-field
                  v-model="editing_product.name"
                  :rules="add_waypoint_form_rules.name"
                >
                  <template #label>
                    Name <span class="red--text"><strong> *</strong></span>
                  </template>
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="closeWaypointDialogs()">Close</v-btn>
                <v-btn text @click="editProductAction(editing_product)"
                  >Save Changes</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-dialog v-model="add_product_dialog" width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5 mb-2">Add Product</span>
            </v-card-title>
            <v-form ref="add_product_form" lazy-validation>
              <v-card-text>
                <v-text-field
                  v-model="adding_product.name"
                  :rules="add_waypoint_form_rules.name"
                >
                  <template #label>
                    Name <span class="red--text"><strong> *</strong></span>
                  </template>
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="closeWaypointDialogs()">Close</v-btn>
                <v-btn text @click="addProductAction(adding_product)"
                  >Add New Product</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
      
    </v-row>

    <v-row justify="center">
        <v-col md="10">
            <v-alert type="warning" class="mb-2" v-if="show_not_finished_yet"
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
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    add_product_dialog: false,
    edit_product_dialog: false,
    adding_product: {},
    editing_product: {},
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
    product_search: "",
    add_waypoint_form_rules: {
      name: [
        (value) => !!value || "A unique name is required.",
        (value) =>
          (value && value.length <= 1000) ||
          "Name is unusually long, please shorten.",
      ],
      required_text: [(value) => !!value || "This field is required."],
      basic_input_under_1000: [
        (value) =>
          (value ? value.length <= 1000 : true) ||
          "This field should be less than 1000 characters.",
      ],
      latitude: [
        (value) =>
          (value ? value >= -90 && value <= 90 : true) ||
          "Latitude is between -90 and 90",
      ],
      latitude_required: [
        (value) => !!value || "This field is required.",
        (value) =>
          (value && value >= -90 && value <= 90) ||
          "Latitude is between -90 and 90",
      ],
      longitude: [
        (value) =>
          (value ? value >= -180 && value <= 180 : true) ||
          "Longitude is between -180 and 180",
      ],
      longitude_required: [
        (value) => !!value || "This field is required.",
        (value) =>
          (value && value >= -180 && value <= 180) ||
          "Longitude is between -180 and 180",
      ],
    },
  }),
  computed: {
    ...mapGetters({
      // This is a getter because deep object properties can be updated and need to be handled with Vue.set for reactivity
      products: "productObjects",
    }),
  },
  methods: {
    ...mapActions(["fetchProducts", "addProduct", "editProduct"]),
    newProductOpen() {
      this.closeWaypointDialogs();
      this.add_product_dialog = true;
    },
    addProductAction(product) {
      let valid = this.validateAddProductForm();
      if (valid) {
        this.addProduct(product)
          .then(() => {
            this.adding_product = {};
            this.showSuccessMessage("Product Created!");
            this.closeWaypointDialogs();
          })
          .catch((error) => {
            this.showErrorMessage(error.message);
            this.closeWaypointDialogs();
          });
      }
    },
    editProductOpen(product) {
      this.closeWaypointDialogs();
      this.editing_product = { ...product };
      this.edit_product_dialog = true;
    },
    editProductAction(product) {
      let valid = this.validateEditProductForm();
      if (valid) {
        this.editProduct(product)
          .then(() => {
            this.showSuccessMessage("Product Edited Successfully!");
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
      this.add_product_dialog = false;
      this.edit_product_dialog = false;
      this.addProductFormResetValidation();
    },
    clearMessages() {
      this.show_not_finished_yet = false;
      this.show_success_message = false;
      this.show_error_message = false;
    },
    validateAddProductForm() {
      return this.$refs.add_product_form.validate();
    },
    addProductFormResetValidation() {
      if (this.$refs && this.$refs.add_product_form) {
        this.$refs.add_product_form.resetValidation();
      }
    },
    validateEditProductForm() {
      return this.$refs.edit_product_form.validate();
    },
    editProductFormResetValidation() {
      if (this.$refs && this.$refs.edit_product_form) {
        this.$refs.edit_product_form.resetValidation();
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
</style>