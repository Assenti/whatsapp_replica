<template>
    <div class="login">
        <div class="login-title">Login</div>
        <form class="form" @submit.prevent="validateBeforeSubmit">
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
            <div class="error">{{ error }}</div>
            <btn btnTitle="login" type="submit"/>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: '',
            loading: false,
            error: undefined
        }
    },
    watch: {
        
    },
    methods: {
        async logIn() {
            try {
                await this.$backend.login({
                    login: this.login,
                    password: this.password
                })
            }
            catch(e) {
                this.error = e
            }
        },
        validateBeforeSubmit() {
            console.log('INVOKED')
            this.$validator.validateAll()
            .then(result => {
                if(result) {
                    this.logIn()
                    return
                }
                console.log('Invalid')
            })
        }
    }
}
</script>
