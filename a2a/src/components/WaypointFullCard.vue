<template>
    <v-dialog
        v-model="show"
        content-class="waypoint-full-card-dialog"
        transition="dialog-bottom-transition"
        hide-overlay
    >
        <v-btn class="dismiss" @click="close()" fab small>
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="d-flex flex-column fill-height">
            <div class="image-filler-block" v-if="waypoint && !waypoint.image"></div>
            <v-img
                v-if="waypoint && waypoint.image"
                :src="waypoint.image"
                :alt="'Photo of ' + waypoint.name"
                max-height="275"
                height="275"
                class="waypoint-full-card-image"
            >
                <template v-slot:placeholder>
                    <div class="image-filler"></div>
                </template>
            </v-img>
            
            <v-card
                class="waypoint-full-card pa-5 pt-0 text-left grow"
            >
                <div class="card-top-filler"></div>
                <div v-if="waypoint">
                    <v-card-actions>
                        <v-btn class="mr-1" icon color="black" @click.prevent="toggleBookmark()">
                            <v-icon>{{ bookmarkIcon }}</v-icon>
                        </v-btn>
                        <v-btn class="mr-1" icon color="black" :href="mapsLink" target="maps.google">
                            <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                        <v-btn class="mr-1" icon color="black" :href="phoneLink">
                            <v-icon>mdi-phone-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="mb-4 waypoint-full-card-title">{{ waypoint.name }}</v-card-title>
                    <v-card-subtitle class="text-left font-weight-medium waypoint-full-card-subtitle">
                        <span>{{ subtitleTypeDistanceText }}</span><br>
                        <span>{{ address }}</span><br>
                        <span v-if="waypoint.hours">{{ waypoint.hours }}</span>
                    </v-card-subtitle>

                    <v-card-text v-if="waypoint.description">
                        {{ waypoint.description }}
                    </v-card-text>

                    <v-card-text class="mt-3">
                        <h2 class="mb-3 waypoint-full-card-subheader">Products</h2>
                        <p v-if="!waypoint.products || waypoint.products.length == 0">No registered products.</p>
                        <div v-if="waypoint.products">
                            <v-chip
                                v-for="product in waypointProducts"
                                :key="`prod-${product.id}`"
                                class="mr-2 waypoint-full-card-chip"
                                dark
                                >{{ product.name }}</v-chip
                            >
                        </div>

                        <h2 class="mb-3 mt-5 waypoint-full-card-subheader">SNAP/EBT Benefits</h2>
                        <p v-if="!waypoint.assistance_options || waypoint.assistance_options.length == 0">No registered benefits.</p>
                        <div v-if="waypoint.assistance_options">
                            <v-chip
                                v-for="opt in waypointAssistanceOptions"
                                :key="`prod-${opt.id}`"
                                class="mr-2 waypoint-full-card-chip"
                                dark
                                >{{ opt.name }}</v-chip
                            >
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </div>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as geofire from 'geofire-common'

export default {
    data: () => {
        return {
            waypoint: null,
            show: false
        }
    },
    computed: {
        ...mapGetters({
            userLoc: "userLocation",
            userLocSet: "userLocationSet",
            products: "productObjects",
            assistanceOptions: "assistanceOptionsObjects"
        }),
        address() {
            let addr = `${this.waypoint.address}, ${this.waypoint.town} ${this.waypoint.state}, ${this.waypoint.zip}`
            return addr
        },
        subtitleTypeDistanceText() {
            let text = `${this.waypoint.type}`
            if ( this.distanceFromUser ) {
                text += ` - ${this.distanceFromUser} mi. away`
            }
            return text
        },
        distanceFromUser() {
            if ( this.userLocSet && this.userLoc ) {
                const distanceInKm = geofire.distanceBetween([this.waypoint.coordinates._lat, this.waypoint.coordinates._long], [this.userLoc.lat, this.userLoc.long])
                const mi = distanceInKm * 0.621371
                return mi.toFixed(1)
            }
            return 0
        },
        waypointProducts() {
            if (this.waypoint.products && this.products) {
                return this.products.filter((prod) => {
                    if (this.waypoint.products.includes(prod.id)) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            return []
        },
        waypointAssistanceOptions() {
            if (
                this.waypoint.assistance_options &&
                this.assistanceOptions
            ) {
                return this.assistanceOptions.filter((opt) => {
                    if (
                        this.waypoint.assistance_options.includes(opt.id)
                    ) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            return []
        },
        mapsLink() {
            if ( this.waypoint.coordinates && this.waypoint.coordinates._lat && this.waypoint.coordinates._long ) {
                return 'https://maps.google.com/?q=' + this.waypoint.coordinates._lat + ',' + this.waypoint.coordinates._long
            }
            return null
        },
        bookmarkIcon() {
            if ( this.waypoint.bookmarked ) {
                return 'mdi-bookmark'
            }
            return 'mdi-bookmark-outline'
        },
        phoneLink() {
            if ( this.waypoint.phone ) {
                return `tel:${this.waypoint.phone}`
            }
            return null
        }
    },
    methods: {
        ...mapMutations({
            'addBookmark': 'SET_BOOKMARK',
            'removeBookmark': 'UNSET_BOOKMARK'
        }),
        openWithWaypoint(waypoint) {
            this.waypoint = waypoint
            this.show = true
        },
        toggleBookmark() {
            if ( this.waypoint.bookmarked ) {
                this.removeBookmark(this.waypoint.id)
                this.waypoint.bookmarked = false
            } else {
                this.addBookmark(this.waypoint.id)
                this.waypoint.bookmarked = true
            }
        },
        close() {
            this.show = false
        }
    }
}
</script>

<style lang="scss">
.waypoint-full-card-dialog {
    margin: 0 0 56px 0!important;
    align-self: flex-start;
    max-height: none!important;
    height: calc(100% - 56px)!important;
    border-radius: 0px!important;
    box-shadow: none!important;
}
</style>

<style lang="scss" scoped>
.card-top-filler {
    position: absolute;
    top: -36px;
    border-top-right-radius: 36px!important;
    border-top-left-radius: 36px!important;
    height: 40px;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: white;
}
.waypoint-full-card {
    position: relative;
    .waypoint-full-card-title {
        font-size: 24px;
    }
    .waypoint-full-card-subtitle {
        font-size: 18px;
        line-height: 1.5;
    }
    .waypoint-full-card-subheader {
        color: grey;
        font-weight: normal;
    }

    .waypoint-full-card-chip {
        background-color: black;
        color: white;
        letter-spacing: 1px;
        padding-left: 16px;
        padding-right: 16px;
        font-size: 15px;
    }
}

.waypoint-full-card-image {
    .image-filler {
        display: block;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.7)
    }
}

.image-filler-block {
    height: 250px;
    background: rgba(0, 0, 0, 0.7);
}

.dismiss {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 9999;
}
</style>