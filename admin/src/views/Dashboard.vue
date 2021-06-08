<template>
  <div class="about">
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          md="10"
        >
          <h1
            class="display-2 font-weight-bold mb-3"
          >Dashboard</h1>

          <v-card
            max-width="400"
          >
            <v-list-item
              two-line
            >
              <v-list-item-content>
                <v-list-item-title class="text-h5">Products / Categories</v-list-item-title>
                <v-list-item-subtitle>Categorizations available in the app.</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="product in products"
              :key="product.name"
            >
              <v-list-item-title>{{ product.name }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    waypoints: []
  }),
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>