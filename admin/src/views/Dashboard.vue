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
        </v-col>
      </v-row>

      <v-row
        justify="center"
      >
        <v-col
          md="5"
        >
          <v-card>
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

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                text
                @click="show_not_finished_yet = true"
              >Add New</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          md="5"
        >
          <v-alert
            type="warning"
            v-if="show_not_finished_yet"
          >Sorry, this isn't completed yet.</v-alert>
        </v-col>
      </v-row>

      <v-row
        justify="center"
      >
        <v-col
          md="10"
        >
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
            </v-card-title>
            <v-data-table
              :search="waypoint_search"
              :headers="waypoint_headers"
              :items="waypoints"
            >
              <template
                v-slot:[`item.website`]="{ item }"
              >
                <v-btn
                  :href="item.website"
                  target="_blank"
                >Visit Website</v-btn>
              </template>
            </v-data-table>
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
    show_not_finished_yet: false,
    waypoint_search: '',
    waypoint_headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name'
      },
      {
        text: 'Type',
        value: 'type'
      },
      {
        text: 'Town',
        value: 'town'
      },
      {
        text: 'State',
        value: 'state'
      },
      {
        text: 'Website',
        value: 'website'
      }
    ]
  }),
  computed: {
    ...mapState({
      products: state => state.products,
      waypoints: state => state.waypoints
    })
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchWaypoints'])
  },
  mounted() {
    this.fetchProducts()
    this.fetchWaypoints()
  }
}
</script>