<template>
    <v-app-bar>
        <a @click="clickHome()">
            <svg class="appicon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 432 432" style="enable-background:new 0 0 432 432;" xml:space="preserve">
                <path d="M301.6,37.9c-21.8-23.9-53-37.5-85.9-37.5c-61.1,0-116.3,46.9-116.3,119.3c0,40,26.6,86,79.6,138.2
                    c11.1,10.9,23.3,22.1,36.7,33.5C293.2,225.2,332,168,332,119.7C332,86.3,320.3,58.3,301.6,37.9z M215.8,87.7
                    c9.8,0,18.5,4.9,23.8,12.4c3.3,4.7,5.3,10.5,5.3,16.7c0,16-13.1,29.1-29.1,29.1c-6.2,0-11.9-2-16.7-5.3c-7.5-5.3-12.4-14-12.4-23.8
                    C186.7,100.8,199.8,87.7,215.8,87.7z"/>
                <path d="M145.5,278.4c-39.8-39.9-93.8-56.7-145.7-50.7C5,335.3,88.8,422.3,195,432.4C203.8,378,187.4,320.3,145.5,278.4z"/>
                <path d="M431.8,227.7c-51.9-6-105.9,10.8-145.7,50.7c-41.9,41.9-58.3,99.6-49.5,154C342.7,422.3,426.5,335.3,431.8,227.7z"/>
            </svg>
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

export default {
    name: "TopButtonNavigation",
    props: {
        toPage: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        SpinLoader
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
.appicon {
    width: 30px;
    height:30px;
    margin-right: 16px;
}
.vert-btn {
    padding-top: 8px;
    padding-bottom: 8px;
    .v-btn__content {
        flex-direction: column;
    }
}
</style>