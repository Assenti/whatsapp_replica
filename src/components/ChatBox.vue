<template>
    <div class="chat-box">
        <div class="chat-box-intro" v-if="!chatData">
            <div></div>
            <h1>Keep your phone connected</h1>
        </div>
        <current-chat v-else :chatData="chatData"/>
    </div>
</template>

<script>
import CurrentChat from '@/components/CurrentChat'
import { bus } from '@/main'
export default {
    components: {
        CurrentChat
    },
    data() {
        return {
            chatData: ''
        }
    },
    created() {
        bus.$on('openChat', chat => {
            this.chatData = chat
        })
    }
}
</script>
