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
          >Waypoints Dashboard</h1>
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
              v-model="add_waypoint_dialog"
              width="600"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5 mb-2">Add Waypoint</span>
                </v-card-title>
                <v-form
                  ref="add_waypoint_form"
                >
                  <v-card-text>
                    <v-text-field
                      v-model="adding_waypoint.name"
                      :rules="add_waypoint_form_rules.name"
                    >
                      <template #label>
                        Name <span class="red--text"><strong> *</strong></span>
                      </template>
                    </v-text-field>
                  </v-card-text>
                  <!-- <v-divider></v-divider> -->
                  <v-card-title>Location</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="adding_waypoint.address"
                          :rules="add_waypoint_form_rules.required_text"
                        >
                          <template #label>
                            Street Address <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          :items="states"
                          v-model="adding_waypoint.state"
                        >
                          <template #label>
                            State <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="adding_waypoint.town"
                          :rules="add_waypoint_form_rules.required_text"
                        >
                          <template #label>
                            Town <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="adding_waypoint.zip"
                          label="Zip Code"
                          :rules="add_waypoint_form_rules.basic_input_under_1000"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row v-if="adding_waypoint.coordinates">
                      <v-col
                        md="4"
                      >
                        <v-text-field
                          v-model="adding_waypoint.coordinates._lat"
                          :rules="add_waypoint_form_rules.latitude_required"
                          required
                          placeholder="41.71403"
                        >
                          <template #label>
                            Latitude <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        md="4"
                      >
                        <v-text-field
                          v-model="adding_waypoint.coordinates._long"
                          :rules="add_waypoint_form_rules.longitude_required"
                          required
                          placeholder="-72.21541"
                        >
                          <template #label>
                            Longitude <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        md="4"
                      >
                        <a
                          href="https://www.latlong.net/"
                          target="_blank"
                        >Help Finding Latitude/Longitude?</a>
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
                          v-model="adding_waypoint.phone"
                          label="Phone"
                          :rules="add_waypoint_form_rules.basic_input_under_1000"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="adding_waypoint.website"
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
                        md="6"
                      >
                        <v-select
                          :items="business_types"
                          v-model="adding_waypoint.type"
                          :rules="add_waypoint_form_rules.required_text"
                        >
                          <template #label>
                            Business Type <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          :items="products"
                          v-model="adding_waypoint.products"
                          item-value="id"
                          item-text="name"
                          label="Products"
                          multiple
                          chips
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      text
                      @click="closeWaypointDialogs()"
                    >Close</v-btn>
                    <v-btn
                      text
                      @click="addItem(adding_waypoint)"
                    >Add New Waypoint</v-btn>
                  </v-card-actions>
                </v-form>
                
                
              </v-card>
            </v-dialog>

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
                <v-form
                  ref="edit_waypoint_form"
                >
                  <v-card-text>
                    <v-text-field
                      v-model="editing_waypoint.name"
                      :rules="add_waypoint_form_rules.name"
                    >
                      <template #label>
                        Name <span class="red--text"><strong> *</strong></span>
                      </template>
                    </v-text-field>
                  </v-card-text>
                  <!-- <v-divider></v-divider> -->
                  <v-card-title>Location</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editing_waypoint.address"
                          label="Street Address"
                          :rules="add_waypoint_form_rules.required_text"
                        >
                          <template #label>
                            Street Address <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          :items="states"
                          v-model="editing_waypoint.state"
                        >
                          <template #label>
                            State <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editing_waypoint.town"
                          :rules="add_waypoint_form_rules.required_text"
                        >
                          <template #label>
                            Town <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editing_waypoint.zip"
                          label="Zip Code"
                          :rules="add_waypoint_form_rules.basic_input_under_1000"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row v-if="editing_waypoint.coordinates">
                      <v-col
                        md="4"
                      >
                        <v-text-field
                          v-model="editing_waypoint.coordinates._lat"
                          :rules="add_waypoint_form_rules.latitude_required"
                          label="Latitude"
                        >
                          <template #label>
                            Latitude <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        md="4"
                      >
                        <v-text-field
                          v-model="editing_waypoint.coordinates._long"
                          :rules="add_waypoint_form_rules.longitude_required"
                          label="Longitude"
                        >
                          <template #label>
                            Longitude <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-text-field>
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
                          :rules="add_waypoint_form_rules.basic_input_under_1000"
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
                        md="6"
                      >
                        <v-select
                          :items="business_types"
                          v-model="editing_waypoint.type"
                          :rules="add_waypoint_form_rules.required_text"
                        >
                          <template #label>
                            Business Type <span class="red--text"><strong> *</strong></span>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          :items="products"
                          v-model="editing_waypoint.products"
                          item-value="id"
                          item-text="name"
                          label="Products"
                          multiple
                          chips
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      text
                      @click="closeWaypointDialogs()"
                    >Close</v-btn>
                    <v-btn
                      text
                      @click="saveItem(editing_waypoint)"
                    >Save Changes</v-btn>
                  </v-card-actions>
                </v-form>
                
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="view_waypoint_dialog"
              width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{viewed_waypoint.name}}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-title>Location</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Address</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.address}}</div>
                    </v-col>
                  </v-row>
                  <v-row>
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
                  <v-row v-if="viewed_waypoint.coordinates">
                    <v-col
                      md="4"
                    >
                      <div class="text-subtitle-1 font-weight-bold">Latitude</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.coordinates._lat}}</div>
                    </v-col>
                    <v-col
                      md="4"
                    >
                      <div class="text-subtitle-1 font-weight-bold">Longitude</div>
                      <div
                        class="text-body-2"
                      >{{viewed_waypoint.coordinates._long}}</div>
                    </v-col>
                    <v-col
                      md="4"
                      v-if="viewed_waypoint_google_maps_link"
                    >
                      <a
                        :href="viewed_waypoint_google_maps_link"
                        target="_blank"
                      >View on Google Maps</a>
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
                  <v-row>
                    <v-col>
                      <div
                        class="text-subtitle-1 font-weight-bold"
                      >Products</div>
                      <v-chip
                        v-for="product in viewed_waypoint_products"
                        :key="product.id"
                        class="mr-2"
                      >{{ product.name }}</v-chip>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    text
                    @click="closeWaypointDialogs()"
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
                  v-if="item.website"
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

      <v-row
        justify="center"
      >
        <v-col
          md="5"
        >
          <v-alert
            type="warning"
            class="mb-2"
            v-if="show_not_finished_yet"
          >Sorry, this isn't completed yet.</v-alert>
          <v-alert
            type="success"
            v-if="show_success_message"
          >{{ success_message_text }}</v-alert>
          <v-alert
            type="error"
            v-if="show_error_message"
          >{{ error_message_text }}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    view_waypoint_dialog: false,
    edit_waypoint_dialog: false,
    add_waypoint_dialog: false,
    viewed_waypoint: {},
    editing_waypoint: {
      coordinates: {}
    },
    adding_waypoint: {},
    default_adding_waypoint_object: {
      state: 'CT',
      coordinates: {}
    },
    show_not_finished_yet: false,
    show_success_message: false,
    success_message_text: '',
    show_error_message: false,
    error_message_text: '',
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
    ],
    states: [
      'CT','MA','RI','VT','NH','NY'
    ],
    add_waypoint_form_rules: {
      name: [
        value => !!value || 'A unique name is required.',
        value => (value && value.length <= 1000) || 'Name is unusually long, please shorten.'
      ],
      required_text: [
        value => !!value || 'This field is required.'
      ],
      basic_input_under_1000: [
        value => (value ? (value.length <= 1000) : true) || 'This field should be less than 1000 characters.'
      ],
      latitude: [
        value => (value ? (value >= -90 && value <= 90) : true) || 'Latitude is between -90 and 90'
      ],
      latitude_required: [
        value => !!value || 'This field is required.',
        value => (value && (value >= -90 && value <= 90)) || 'Latitude is between -90 and 90'
      ],
      longitude: [
        value => (value ? (value >= -180 && value <= 180) : true) || 'Longitude is between -180 and 180'
      ],
      longitude_required: [
        value => !!value || 'This field is required.',
        value => (value && (value >= -180 && value <= 180)) || 'Longitude is between -180 and 180'
      ]
    }
  }),
  computed: {
    ...mapState({
      business_types: state => state.business_types
    }),
    ...mapGetters({
      // This is a getter because deep object properties can be updated and need to be handled with Vue.set for reactivity
      products: 'productObjects',
      waypoints: 'waypointObjects'
    }),
    viewed_waypoint_google_maps_link() {
      if ( this.viewed_waypoint.coordinates && this.viewed_waypoint.coordinates._lat && this.viewed_waypoint.coordinates._long ) {
        return 'https://maps.google.com?q=' + this.viewed_waypoint.coordinates._lat + ',' + this.viewed_waypoint.coordinates._long
      }
      return ''
    },
    viewed_waypoint_products() {
      if ( this.viewed_waypoint.products && this.products ) {
        return this.products.filter( prod => {
          if ( this.viewed_waypoint.products.includes( prod.id ) ) {
            return true
          } else {
            return false
          }
        })
      }
      return []
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchWaypoints', 'editWaypoint', 'addWaypoint']),
    viewItem(item) {
      this.closeWaypointDialogs()
      this.viewed_waypoint = item
      this.view_waypoint_dialog = true
    },
    editItem(item) {
      this.closeWaypointDialogs()
      this.editing_waypoint = {...item}
      this.edit_waypoint_dialog = true
    },
    saveItem(item) {
      let valid = this.validateEditWaypointForm()
      if ( valid ) {
        this.editWaypoint(item)
          .then(() => {
            this.showSuccessMessage('Waypoint Edited Successfully!')
            this.closeWaypointDialogs()
          }).catch(err => {
            this.showErrorMessage(err.message)
          })
        this.closeWaypointDialogs()
      }
    },
    newItem() {
      this.closeWaypointDialogs()
      this.add_waypoint_dialog = true
    },
    addItem(item) {
      let valid = this.validateAddWaypointForm()
      if ( valid ) {
        this.addWaypoint(item)
          .then(() => {
            this.adding_waypoint = this.default_adding_waypoint_object
            this.showSuccessMessage('Waypoint Created!')
            this.closeWaypointDialogs()
          }).catch(err => {
            this.showErrorMessage(err.message)
          })
        this.closeWaypointDialogs()
      }
    },
    showNotFinishedMessage() {
      this.clearMessages()
      setTimeout(() => {
        this.show_not_finished_yet = true
      },100)
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
      this.view_waypoint_dialog = false
      this.edit_waypoint_dialog = false
      this.add_waypoint_dialog = false
      this.addWaypointFormResetValidation()
      this.editWaypointFormResetValidation()
    },
    clearMessages() {
      this.show_not_finished_yet = false
      this.show_success_message = false
      this.show_error_message = false
    },
    validateAddWaypointForm() {
      return this.$refs.add_waypoint_form.validate()
    },
    addWaypointFormResetValidation() {
      if ( this.$refs && this.$refs.add_waypoint_form ) {
        this.$refs.add_waypoint_form.resetValidation()
      }
    },
    validateEditWaypointForm() {
      return this.$refs.edit_waypoint_form.validate()
    },
    editWaypointFormResetValidation() {
      if ( this.$refs && this.$refs.edit_waypoint_form ) {
        this.$refs.edit_waypoint_form.resetValidation()
      }
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchWaypoints()
    this.adding_waypoint = this.default_adding_waypoint_object
  }
}
</script>

<style scoped>
.white-space-normal {
  white-space: normal
}
</style>