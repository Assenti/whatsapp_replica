<template>
    <div class="chat-box">
        <current-chat :chatData="chatData"/>
    </div>
</template>

<script>
import CurrentChat from '@/components/CurrentChat'
export default {
    components: {
        CurrentChat
    },
    data() {
        return {
            chatData: {}
        }
    }
}
</script>
