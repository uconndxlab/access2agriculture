<template>
    <v-dialog
        v-model="open"
        max-width="500"
    >
        <v-card>
            <v-card-title>Edit Waypoint Image</v-card-title>
            <v-card-subtitle>{{ waypoint.name }}</v-card-subtitle>
            <v-img
                :src="existingImageUrl"
                v-if="existingImageUrl"
                :alt="existingImageAlt"
                max-width="500"
                class="mb-4"
                contain
            />
            <v-card-text v-else>
                <p>No image.</p>
            </v-card-text>
            <v-card-text>
                <v-file-input
                    show-size
                    label="Image File"
                    v-model="image"
                ></v-file-input>
                <v-progress-linear
                    :value="uploadProgress"
                    :color="progressColor"
                    v-if="showProgressBar"
                    background-color="green lighten-3"
                    rounded
                    class="mb-3"
                ></v-progress-linear>
                <v-alert
                    v-if="message.show"
                    :type="message.type"
                >{{ message.body }}</v-alert>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    color="primary"
                    @click="uploadImage()"
                >Upload &amp; Save</v-btn>
                <v-btn
                    text
                    @click="close()"
                >Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { storage } from '@/firebase'
import firebase from "firebase/app"
import mime from 'mime-types'

function initialData() {
    return {
        waypoint: {},
        open: false,
        image: null,
        message: {
            type: 'error',
            body: 'Error',
            show: false
        },
        uploadProgress: 0,
        progressColor: '',
        showProgressBar: false,
        existingImageUrl: '',
        showSkeleton: true
    }
}

export default {
    data: () => {
        return initialData()
    },
    computed: {
        existingImageAlt() {
            if ( this.existingImageUrl && this.waypoint.name ) {
                return 'Image for ' + this.waypoint.name
            }
            return ''
        }
    },
    methods: {
        ...mapActions([
            'uploadWaypointImage',
            'waypointExists'
        ]),
        openWaypoint(waypoint) {
            Object.assign(this.$data, initialData())
            this.waypoint = waypoint
            if ( waypoint.image ) {
                this.existingImageUrl = waypoint.image 
            }
            this.open = true
        },
        close() {
            this.open = false
        },
        async uploadImage() {
            this.showProgressBar = true
            try {
                const waypoint_exists = await this.waypointExists(this.waypoint)
                if ( this.image && waypoint_exists ) {
                    this.message.show = false
                    const storageFileParent = `waypoint_images`
                    const storageFileName = `${this.waypoint.id}.${mime.extension(this.image.type)}`
                    const storageRef = storage.ref()
                    const fileRef = storageRef.child(`${storageFileParent}/${storageFileName}`)

                    const uploadTask = fileRef.put(this.image)

                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot) => {
                            // State while uploading
                            this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        },
                        (error) => {
                            // Unsuccessful upload
                            this.message.type = 'error'
                            switch ( error.code ) {
                            case 'storage/unauthorized':
                                this.message.body = 'Authenticated user is not authorized to upload.'
                                break
                            case 'storage/canceled':
                                this.message.body = 'Upload was cancelled.'
                                break
                            case 'storage/unknown':
                                this.message.body = 'Unknown error occurred.  Check logs.'
                                break
                            }
                            this.message.show = true
                        },
                        () => {
                            // Successful upload
                            this.message.type = 'success'
                            this.message.body = 'Image uploaded successfully.'
                            this.message.show = true
                            this.progressColor = 'green'

                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                this.uploadWaypointImage({
                                    waypoint: this.waypoint,
                                    imageURL: downloadURL
                                })
                                this.waypoint.image = downloadURL
                                this.existingImageUrl = downloadURL
                            })
                        }
                    )
                }
            } catch(error) {
                console.log(error)
                this.message.type = 'error'
                this.message.show = true
            }
        }
    }
}
</script>