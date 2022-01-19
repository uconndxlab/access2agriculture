<template>
    <v-card class="mb-2">
        <v-card-title v-text="title" />
        <v-card-text class="text-left">
            <p>{{ description }}</p>
        </v-card-text>

        <v-card-actions v-if="link">
            <v-btn
                text
                :to="link"
            >
                Learn More
            </v-btn>
        </v-card-actions>
    </v-card>    
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: ''
        }
    }
}
</script>