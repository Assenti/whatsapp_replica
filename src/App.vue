<template>
    <div id="app">
        <component :is="current"/>
        <preloader v-if="preloader"/>
        <transition name="animations"
            enter-active-class="toastUp"
            leave-active-class="toastDown">
            <toast v-if="toastText" 
            :text="toastText" 
            @closed="toastText = ''"/>
        </transition>
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
            preloader: false,
            toastText: '',
            timeout: 5000
        }
    },
    computed: {
        current() {
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
        bus.$on('toast', (data) => {
            this.toastText = data.text
            setTimeout(() => {
                this.toastText = ''
            }, this.timeout)
        })

        if(this.$socket.connected) {
            this.toastText = 'Socket connected'
            setTimeout(() => {
                this.toastText = ''
            }, this.timeout)
        }
        else {
            this.toastText = 'Socket disconnected'
            setTimeout(() => {
                this.toastText = ''
            }, this.timeout)
        }
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
            else if(e.message && e.message === 'Network Error') {
                bus.$emit('toast', { text: 'No connection to server' })
            }
            else {
                bus.$emit('toast', { text: 'Server error occurred' })
            }
        }
    }
}
</script>
