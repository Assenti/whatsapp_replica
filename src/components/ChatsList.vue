<template>
    <div class="chats-list">
        <slot name="list-item"></slot>
        <slot name="other"></slot>
        <div v-for="(chat, index) in chats" 
            :key="index" 
            class="chats-list-item"
            @click="handleClick(chat)">
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
            let filtered = chat.users.filter(user => {
                return this.$store.getters.getUserId !== user._id
            })
            return `${filtered[0].firstname} ${filtered[0].lastname}`
        },
        date(chat) {
            return new Date(chat.createdAt).toLocaleDateString()
        },
        lastMessage(chat) {
            return chat.messages.length > 0 ? 
                chat.messages[chat.messages.length - 1].text : ''
        },
        handleClick(chat) {
            this.$emit('clicked', chat)
        }
    }
}
</script>
