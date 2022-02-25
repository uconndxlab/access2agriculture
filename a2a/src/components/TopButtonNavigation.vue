<template>
    <v-app-bar>
        <a @click="clickHome()" class="mr-4 app-icon-link">
            <app-icon size="30px" />
        </a>
        
        <v-toolbar-title class="font-weight-black">Access2Ag</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            elevation="0"
            @click="openFilter()"
            class="vert-btn mr-2"
            v-if="!toPage"
        >
            <v-icon color="black">mdi-filter-variant</v-icon>
            Filter
        </v-btn>
        <v-btn
            elevation="0"
            @click="openNearMe()"
            class="vert-btn"
            v-if="!toPage"
        >
            <template v-if="!showNearMeLoader">
            <v-icon color="black">mdi-navigation-variant</v-icon>
            Near Me
            </template>
            <spin-loader v-if="showNearMeLoader"></spin-loader>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import SpinLoader from '@/components/SpinLoader.vue'
import AppIcon from '@/components/AppIcon.vue'

export default {
    name: "TopButtonNavigation",
    props: {
        toPage: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        SpinLoader,
        AppIcon
    },
    data: () => {
        return {
            locationStatusMessage: "",
            showNearMeLoader: false
        }
    },
    computed: {
        ...mapGetters({
            locationHasBeenSet: "userLocationSet",
        }),
        isRootMapRoute() {
            return this.$route.path === "/"
        },
    },
    methods: {
        ...mapMutations({
            setCoordinates: "SET_USER_COORDINATES",
            setFilterLocationDistance: "SET_FILTER_LOCATION_DISTANCE"
        }),
        openFilter() {
            this.$emit("topNavOpenFilter")
        },
        openNearMe() {
            this.requestLocation()
        },
        clickHome() {
            this.$emit('clickHome')
        },
        requestLocation() {
            this.showNearMeLoader = true
            if (!navigator.geolocation) {
                console.log("Browser does not support location.")
                this.$emit('locationHasError', "Browser does not support location services.")
                this.showNearMeLoader = false
            } else {
                console.log("Browser supports location.")
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        if (
                            pos.coords &&
                            pos.coords.latitude &&
                            pos.coords.longitude
                        ) {
                            this.setCoordinates({
                                lat: pos.coords.latitude,
                                long: pos.coords.longitude,
                            })
                            this.$emit("locationJustSet")
                            this.setFilterLocationDistance(10)
                        }
                        this.showNearMeLoader = false
                    },
                    (error) => {
                        const default_error_message =
                            "Something went wrong with the location service."
                        const error_messages = {
                            1: "Permission to location was denied.  In order to enable this functionality, you must enable location permissions manually on your browser.", // User denied geolocation,
                            2: "Unable to determine location from this device.",
                            3: "Location detection timed out.",
                        }
                        if (
                            error.code &&
                            error.code.toString() in error_messages
                        ) {
                            this.locationStatusMessage =
                                error_messages[error.code.toString()]
                        } else {
                            this.locationStatusMessage = default_error_message
                        }
                        this.$emit(
                            "locationHasError",
                            this.locationStatusMessage
                        )
                        this.showNearMeLoader = false
                    }
                )
            }
        },
    },
}
</script>

<style lang="scss">
.app-icon-link {
    line-height: 1;
}
.vert-btn {
    padding-top: 8px;
    padding-bottom: 8px;
    .v-btn__content {
        flex-direction: column;
    }
}
</style>