<template>
    <div class="login">
        <div class="login-title">Sign in</div>
        <form class="form px-10" @submit.prevent="validateBeforeSubmit">
            <form-field v-model="login"
                label="Login"
                class="mb-5"
                placeholder="Login"
                v-validate="'required'"
                :autocomplete="false"
                name="login"
                :msg="errors.first('login')"
                icon="person"/>
            <form-field v-model="password" 
                label="Password"    
                placeholder="Password"
                v-validate="'required'"
                name="password"
                :msg="errors.first('password')"
                type="password"
                icon="lock"/>
            <div class="error mt-10">{{ error }}</div>
            <check-box v-model="remember"
                class="my-10 ml-15" 
                label="Remember"/>
            <btn btnTitle="login" type="submit" :block="true"/>
        </form>
    </div>
</template>

<script>
import { bus } from '@/main'
export default {
    data() {
        return {
            login: '',
            password: '',
            loading: false,
            error: undefined,
            remember: false
        }
    },
    methods: {
        async logIn() {
            bus.$emit('preloaderOn')

            const credentials = {
                login: this.login,
                password: this.password,
                remember: this.remember
            }

            try {
                const { data } = await this.$backend.http.post('/login', credentials)
                this.$store.dispatch('setUser', data)
                bus.$emit('loggedIn')
            }
            catch(e) {
                console.log(e)
                let errMsg = e.response ? e.response.data : 'Error occured'
                this.error = errMsg
            }
            finally {
                bus.$emit('preloaderOff')
            }
        },
        validateBeforeSubmit() {
            this.$validator.validateAll()
            .then(result => {
                if(result) {
                    this.logIn()
                    return
                }
            })
        }
    }
}
</script>
