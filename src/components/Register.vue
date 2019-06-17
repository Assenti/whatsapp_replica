<template>
    <div class="login">
        <div class="login-title">Register</div>
        <form class="form" @submit.prevent="register">
            <form-field v-model="firstname" 
                label="Firstname"
                class="mb-5"
                placeholder="Input your firstname"
                icon="person"/>
            <form-field v-model="lastname" 
                label="Lastname"
                class="mb-5"
                placeholder="Input your lastname"
                icon="person"/>
            <form-field v-model="email" 
                label="Email"
                class="mb-5"
                placeholder="Input your Email"
                icon="mail"/>
            <form-field v-model="password" 
                label="Password"
                class="mb-5"
                type="password"
                placeholder="Create password"
                icon="lock"/>
            <form-field v-model="password" 
                label="Confirm Password"
                icon="lock"
                placeholder="Confirm password"
                type="password"/>
            <btn btnTitle="register" type="submit" :block="true"/>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    methods: {
        register() {

        }
    }
}
</script>
