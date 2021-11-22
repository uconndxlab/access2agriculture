<template>
    <div id="settings-view">
        <top-button-navigation
            @clickHome="$router.push('/')"
        ></top-button-navigation>
        <v-list
            subheader
            two-line
        >
            <v-subheader>Data</v-subheader>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Clear Data</v-list-item-title>
                    <v-list-item-subtitle>Delete all cached data &amp; bookmarks.</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn @click="clearData()">Clear</v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-subheader>Version</v-subheader>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Current Version</v-list-item-title>
                    <v-list-item-subtitle>{{ version }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-alert type="success"
            :value="showAlert"
            dismissible
            width="200px"
            class="ml-auto mr-auto mt-4"
            @input="alertStatusChanged"
        >
            {{ alertMessage }}
        </v-alert>
    </div>
</template>

<script>
import TopButtonNavigation from '@/components/TopButtonNavigation.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data: () => ({
        showAlert: false,
        alertMessage: ''
    }),
    components: { TopButtonNavigation },
    computed: {
        ...mapGetters({
            'version': 'version'
        })
    },
    methods: {
        ...mapMutations({
            'clearAllData': 'NUKE'
        }),
        clearData() {
            this.clearAllData()
            this.showAlert = false
            this.alertMessage = `Data cleared!`
            this.showAlert = true
        },
        alertStatusChanged(status) {
            this.showAlert = status
        }
    }
}
</script>

