<template>
    <v-alert 
        color="red" 
        :value="show" 
        class="location-error-alert"
        max-width="400px"
        dismissible
        @input="handleInputChange"
    >
        <div class="white--text pb-3">{{ message }}</div>
        <v-progress-linear
            :value="progress"
            background-color="red"
            color="red lighten-3"
            absolute
            height="10"
            bottom
        ></v-progress-linear>
    </v-alert>
</template>

<script>


export default {
    data: () => {
        return {
            default_message: "There was an issue retrieving location data.  You might have a poor cellular/wifi connection, or have denied permissions on this device.",
            message: "There was an issue retrieving location data.  You might have a poor cellular/wifi connection, or have denied permissions on this device.",
            show: false,
            progress: 0,
            interval: null
        }
    },
    methods: {
        updateMessage(message) {
            if ( message ) {
                this.message = message
            } else {
                this.message = this.default_message.toString()
            }
        },
        showAlert() {
            this.show = true
        },
        closeAlert() {
            this.show = false
            clearInterval(this.interval)
        },
        showAlertForTime(time) {
            this.closeAlert()
            this.showAlert()
            this.startProgressBar(time)
            setTimeout(() => {
                this.closeAlert()
            }, time)
        },
        startProgressBar(time) {
            const offset = time * 0.05
            this.progress = 0
            const interval = 100
            const times_interval_will_run = (time - offset) / interval
            const percent_increase = 100 / times_interval_will_run
            this.interval = setInterval(() => {
                this.progress += percent_increase
            }, interval)
        },
        handleInputChange(e) {
            if ( e === false ) {
                this.closeAlert()
            }
        }
    }
}
</script>

<style lang="scss">
.location-error-alert {
    margin-top: 20px;
    float: right;
    margin-right: 20px;
    margin-left: 20px;
    position: fixed;
    z-index: 999;
    right: 0;
}
</style>