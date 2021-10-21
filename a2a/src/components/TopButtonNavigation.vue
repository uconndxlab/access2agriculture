<template>
    <v-app-bar color="white">
        <v-icon></v-icon>
        <v-toolbar-title>Access2Ag</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            elevation="0"
            color="white"
            @click="openFilter()"
            class="vert-btn mr-2"
            v-if="!toPage"
        >
            <v-icon color="black">mdi-filter-variant</v-icon>
            Filter
        </v-btn>
        <v-btn
            elevation="0"
            color="white"
            @click="openNearMe()"
            class="vert-btn"
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
import { mapGetters, mapMutations } from "vuex";
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
        };
    },
    computed: {
        ...mapGetters({
            locationHasBeenSet: "userLocationSet",
        }),
        isRootMapRoute() {
            return this.$route.path === "/";
        },
    },
    methods: {
        ...mapMutations({
            setCoordinates: "SET_USER_COORDINATES",
            setFilterLocationDistance: "SET_FILTER_LOCATION_DISTANCE"
        }),
        openFilter() {
            this.$emit("topNavOpenFilter");
        },
        openNearMe() {
            this.requestLocation();
        },
        requestLocation() {
            this.showNearMeLoader = true
            if (!navigator.geolocation) {
                console.log("Not able to retrieve location.");
                this.$emit('locationHasError')
                this.showNearMeLoader = false
            } else {
                console.log("Has access to location");
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        console.log("Retrieved location:", pos);
                        if (
                            pos.coords &&
                            pos.coords.latitude &&
                            pos.coords.longitude
                        ) {
                            this.setCoordinates({
                                lat: pos.coords.latitude,
                                long: pos.coords.longitude,
                            });
                            this.$emit("locationJustSet");
                            this.setFilterLocationDistance(10)
                        }
                        this.showNearMeLoader = false
                    },
                    (error) => {
                        const default_error_message =
                            "Something went wrong with the location service.";
                        const error_messages = {
                            1: "Permission to location was denied.  In order to enable this functionality, you must enable location permissions manually on your browser.", // User denied geolocation,
                            2: "Unable to determine location from this device.",
                            3: "Location detection timed out.",
                        };
                        if (
                            error.code &&
                            error.code.toString() in error_messages
                        ) {
                            this.locationStatusMessage =
                                error_messages[error.code.toString()];
                        } else {
                            this.locationStatusMessage = default_error_message;
                        }
                        this.$emit(
                            "locationHasError",
                            this.locationStatusMessage
                        );
                        this.showNearMeLoader = false
                    }
                );
            }
        },
    },
};
</script>

<style lang="scss">
.vert-btn {
    padding-top: 8px;
    padding-bottom: 8px;
    .v-btn__content {
        flex-direction: column;
    }
}
</style>