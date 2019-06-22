<template>
    <div class="chats-list">
        <slot name="list-item"></slot>
        <slot name="other"></slot>
        <div v-for="(user, index) in users" 
            :key="index" 
            class="chats-list-item"
            @click="handleClick(user)">
            <div class="chats-list-item-avatar">
                <img :title="iconAuthor" 
                    src="../assets/user.png" 
                    alt="avatar">
            </div>
            <div class="chats-list-item-content">
                <div class="chats-list-item-title">
                    <div>{{ user.firstname }} {{ user.lastname }}</div>
                </div>
                <div class="chats-list-item-subtitle">{{ user.status }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        users: Array
    },
    data() {
        return {
            iconAuthor: 'Icons from https://www.flaticon.com/authors/smashicons'
        }
    },
    methods: {
        handleClick(user) {
            this.$emit('clicked', user)
        }
    }
}
</script>
