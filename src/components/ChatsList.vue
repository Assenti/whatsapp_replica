<template>
    <div class="chats-list">
        <slot name="list-item"></slot>
        <slot name="other"></slot>
        <div v-for="(chat, index) in chats" 
            :key="index" 
            class="chats-list-item">
            <div class="chats-list-item-avatar">
                <img :title="iconAuthor" 
                    src="../assets/user.png" 
                    alt="avatar">
            </div>
            <div class="chats-list-item-content">
                <div class="chats-list-item-title">
                    <div>{{ name(chat) }}</div>
                    <span>{{ date(chat) }}</span>
                </div>
                <div class="chats-list-item-subtitle">{{ lastMessage(chat) }}</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        chats: Array
    },
    data() {
        return {
            iconAuthor: 'Icons from https://www.flaticon.com/authors/smashicons'
        }
    },
    methods: {
        name(chat) {
            return `${chat.users[1].firstname} ${chat.users[1].lastname}`
        },
        date(chat) {
            return new Date(chat.createdAt).toLocaleDateString()
        },
        lastMessage(chat) {
            return chat.messages[chat.messages.length - 1]
        }
    }
}
</script>
