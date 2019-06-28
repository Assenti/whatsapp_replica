<template>
    <div class="login">
        <div class="login-title">Register</div>
        <form class="form px-10" @submit.prevent="validateBeforeSubmit">
            <form-field v-model="credentials.firstname" 
                label="Firstname"
                class="mb-5"
                v-validate="'required'"
                :autocomplete="false"
                name="firstname"
                :msg="errors.first('firstname')"
                placeholder="Input your firstname"
                icon="person"/>
            <form-field v-model="credentials.lastname" 
                label="Lastname"
                class="mb-5"
                v-validate="'required'"
                :msg="errors.first('lastname')"
                :autocomplete="false"
                name="lastname"
                placeholder="Input your lastname"
                icon="person"/>
            <form-field v-model="credentials.email" 
                label="Email"
                class="mb-5"
                v-validate="'required'"
                :msg="errors.first('email')"
                :autocomplete="false"
                name="email"
                placeholder="Input your Email"
                icon="mail"/>
            <form-field v-model="credentials.password" 
                label="Password"
                class="mb-5"
                v-validate="'required'"
                :autocomplete="false"
                :msg="errors.first('password')"
                name="password"
                type="password"
                placeholder="Create password"
                icon="lock"/>
            <form-field v-model="confirmPassword" 
                label="Confirm Password"
                icon="lock"
                placeholder="Confirm password"
                type="password"/>

            <div class="error">{{ error }}</div>
            <div class="success">{{ msg }}</div>
            <btn btnTitle="register" 
                 type="submit"
                 :block="true"
                 @click="validateBeforeSubmit"/>
        </form>
    </div>
</template>

<script>
import { bus } from '@/main'
export default {
    data() {
        return {
            credentials: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },
            confirmPassword: '',
            loading: false,
            error: '',
            msg: ''
        }
    },
    computed: {
        isPasswordSame() {
            return this.credentials.password === this.confirmPassword
        }
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll()
            .then(result => {
                if(result) {
                    if(this.isPasswordSame) {
                        this.register()
                        return
                    }
                    else if(!this.isPasswordSame) {
                        this.error = 'Passwords do not match'
                        setTimeout(() => {
                            this.error = ''
                        }, 5000)
                    }
                }
            })
        },
        async register() {
            try {
                let vm = this
                bus.$emit('preloaderOn')
                await this.$http.post('/register', this.credentials)
                this.msg = 'You are successfully registered'
                const { email, password } = this.credentials
                setTimeout(() => {
                    vm.logIn(email, password)
                }, 1000)
            }
            catch(e) {
                this.error = e.response.data ? e.response.data : 'Error occurred'
                setTimeout(() => {
                    this.error = ''
                }, 5000)
            }
            finally {
                bus.$emit('preloaderOff')
            }
        },
        async logIn(login, password) {
            try {
                await this.$backend.login({
                    login: login,
                    password: password
                })
            }
            catch(e) {
                this.error = e
            }
        }
    }
}
</script>
