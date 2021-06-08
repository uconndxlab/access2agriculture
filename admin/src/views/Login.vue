<template>
    <div class="login">
        <p>Login Page.</p>

        <div class="login-form">
            <form @submit.prevent>
                <div class="form-field">
                    <label for="email" class="email">
                        Email
                        <input type="text" placeholder="your.email@example.com" v-model.trim="loginForm.email">
                    </label>
                    <label for="password" class="pw">
                        Password
                        <input type="password" placeholder="******" v-model.trim="loginForm.password">
                    </label>
                </div>
                <button class="login-btn" @click="login()">Log In</button>
            </form>

            <div class="message">
                <p>{{ message }}</p>
            </div>
        </div>
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
            message: ''
        }
    },
    methods: {
        login() {
            let login_obj = {
                email: this.loginForm.email,
                password: this.loginForm.password
            }
            this.$store.dispatch('login', login_obj).then(user => {
                console.log('Successful login.')
                this.message = 'Successfully logged in with a valid user.'
            }).catch(error => {
                console.log('Attempted sign-in with a non-valid user.')
                this.message = 'Attempted sign-in with a non-valid user.'
            })
        }
    }
}
</script>