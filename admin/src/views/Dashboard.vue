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
                @click="showNotFinishedMessage()"
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
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="newItem()"
              >New Waypoint</v-btn>
            </v-card-title>

            <v-dialog
              v-model="edit_waypoint_dialog"
              width="600"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5 mb-2">Edit Waypoint</span>
                </v-card-title>
                <v-card-subtitle>
                  ID: {{ editing_waypoint.id }}
                </v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    v-model="editing_waypoint.name"
                    label="Name"
                  ></v-text-field>
                </v-card-text>
                <!-- <v-divider></v-divider> -->
                <v-card-title>Location</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editing_waypoint.address"
                        label="Street Address"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editing_waypoint.state"
                        label="State"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editing_waypoint.town"
                        label="Town"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editing_waypoint.zip"
                        label="Zip Code"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <!-- <v-divider></v-divider> -->
                <v-card-title>Contact</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editing_waypoint.phone"
                        label="Phone"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="editing_waypoint.website"
                        label="Website"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <!-- <v-divider></v-divider> -->
                <v-card-title>Metadata</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editing_waypoint.type"
                        label="Type"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    text
                    @click="close_waypoint_dialogs()"
                  >Close</v-btn>
                  <v-btn
                    text
                    @click="saveItem(editing_waypoint)"
                  >Save Changes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="view_waypoint_dialog"
              width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">View Waypoint</span>
                </v-card-title>
                <v-card-text>
                  <div
                    class="text-subtitle-1 font-weight-bold"
                  >Name</div>
                  <div
                    class="text-body-2"
                  >{{viewed_waypoint.name}}</div>
                  
                </v-card-text>
                <v-divider></v-divider>
                <v-card-title>Location</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Address</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.address}}</div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >State</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.state}}</div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Town</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.town}}</div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Zip Code</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.zip}}</div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-title>Contact</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Phone</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.phone}}</div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Website</div>
                      <div
                        class="text-body-2"
                      ><a :href="viewed_waypoint.website">{{viewed_waypoint.website}}</a></div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-title>Metadata</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Type</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.type}}</div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    text
                    @click="close_waypoint_dialogs()"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
            <v-data-table
              :search="waypoint_search"
              :headers="waypoint_headers"
              :items="waypoints"
            >
              <template
                v-slot:[`item.website`]="{ item }"
              >
                <v-chip
                  :href="item.website"
                  target="_blank"
                  color="primary"
                  outlined
                >
                  <v-icon
                    left
                  >mdi-open-in-new</v-icon>
                Visit Website</v-chip>
              </template>
              <template
                v-slot:[`item.actions`]="{ item }"
              >
                <v-icon
                  class="mr-2"
                  @click="viewItem(item)"
                >mdi-eye</v-icon>
                <v-icon
                  class="mr-2"
                  @click="editItem(item)"
                >mdi-pencil</v-icon>
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
    view_waypoint_dialog: false,
    edit_waypoint_dialog: false,
    viewed_waypoint: {},
    editing_waypoint: {},
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
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
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
    ...mapActions(['fetchProducts', 'fetchWaypoints', 'editWaypoint']),
    viewItem(item) {
      this.close_waypoint_dialogs()
      this.viewed_waypoint = item
      this.view_waypoint_dialog = true
    },
    editItem(item) {
      this.close_waypoint_dialogs()
      this.editing_waypoint = item
      this.edit_waypoint_dialog = true
    },
    saveItem(item) {
      this.editWaypoint(item)
      this.close_waypoint_dialogs()
    },
    newItem() {
      this.showNotFinishedMessage()
    },
    showNotFinishedMessage() {
      this.show_not_finished_yet = false
      setTimeout(() => {
        this.show_not_finished_yet = true
      },100)
    },
    close_waypoint_dialogs() {
      this.view_waypoint_dialog = false
      this.edit_waypoint_dialog = false
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchWaypoints()
  }
}
</script>