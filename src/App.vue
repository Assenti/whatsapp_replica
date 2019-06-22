<template>
    <div id="app">
        <component :is="current"/>
        <preloader v-if="preloader"/>
    </div>
</template>

<script>
import { bus } from '@/main'
import Home from '@/views/Home'
import ChatRoom from '@/views/ChatRoom'
import Preloader from '@/components/Preloader'
import { backendService } from '@/services/backendService'

export default {
    components: {
        Preloader
    },
    data() {
        return {
            preloader: false
        }
    },
    computed: {
        current() {
            console.log(this.$store.getters.isLoggedIn)
            if(this.$store.getters.isLoggedIn) {
                return ChatRoom
            }
            else {
                return Home
            }
        }
    },
    created() {
        bus.$on('preloaderOn', () => this.preloader = true)
        bus.$on('preloaderOff', () => this.preloader = false)
    },
    async mounted() {
        try {
            backendService.setJwt()
            await backendService.http.get('/session')
        }
        catch (e) {
            if(e.response.status == 401) {
                this.$store.dispatch('unsetUser')
            }
        }
    }
}
</script>
