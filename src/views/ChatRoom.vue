<template>
    <div class="chat-room">
        <div class="chat-participants">
            <div class="chat-participants-toolbar">
                <div></div>
                <div>
                    <icon icon="more_vert"/>
                </div>
            </div>
            <div class="chat-search-block">
                <form-field
                    placeholder="Search or start new chat" 
                    icon="search"/>
            </div>
            <chats-list/>
        </div>
        <chat-box/>
    </div>
</template>

<script>
import ChatBox from '@/components/ChatBox'
import ChatsList from '@/components/ChatsList'

export default {
    components: {
        ChatBox, ChatsList
    }
}
</script>

