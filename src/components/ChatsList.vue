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
                    <div>Tony Stark</div>
                    <span>01/01/2019</span>
                </div>
                <div class="chats-list-item-subtitle">Last message of chat</div>
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
    }
}
</script>
