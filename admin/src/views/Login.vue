<template>
    <div class="login">
        <v-container>
            <v-row
                justify="center"
            >
                <v-col
                    md="6"
                >
                    <h1 class="display-2 font-weight-bold mb-3">Login</h1>
                </v-col>
            </v-row>

            <v-form @submit.prevent="login">
                <v-row
                    justify="center"
                    class="login-form"
                >
                    <v-col
                        md="6"
                    >
                        <v-text-field
                            v-model.trim="loginForm.email"
                            label="Email"
                            placeholder="your.email@example.com"
                        ></v-text-field>

                        <v-text-field
                            v-model.trim="loginForm.password"
                            placeholder="******"
                            label="Password"
                            :type="inputType"
                            :append-icon="appendIcon"
                            @click:append="passwordVisible = !passwordVisible"
                        >

                        </v-text-field>

                        <v-btn
                            type="submit"
                            :loading="loading"
                            :disabled="loading"
                            class="mb-4"
                        >Log In</v-btn>

                        <v-alert
                            v-if="message"
                            :type="messageType"
                            :color="messageColor"
                        >{{ message }}</v-alert>
                    </v-col>
                </v-row>
            </v-form>
            
        </v-container>
    </div>
</template>

<script>
/*eslint-disable no-unused-vars */
export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            message: '',
            messageType: 'success',
            loading: false,
            passwordVisible: false
        }
    },
    computed: {
        messageColor() {
            if ( this.messageType === 'success' ) {
                return 'green'
            }
            return 'red'
        },
        appendIcon() {
            return this.passwordVisible ? 'mdi-eye-off' : 'mdi-eye'
        },
        inputType() {
            return this.passwordVisible ? 'text' : 'password'
        }
    },
    methods: {
        login() {
            let login_obj = {
                email: this.loginForm.email,
                password: this.loginForm.password
            }
            this.loading = true
            this.$store.dispatch('login', login_obj).then(user => {
                console.log('Successful login.')
                this.message = 'Successfully logged in with a valid user.'
                this.messageType = 'success'
                this.loading = false
            }).catch(error => {
                console.log('Credentials were incorrect or user was not authorized to log into this platform.')
                this.message = 'Credentials were incorrect or user was not authorized to log into this platform.'
                this.messageType = 'error'
                this.loading = false
            })
        }
    }
}
</script>