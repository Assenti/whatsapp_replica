<template>
    <div class="chats-list">
        <div v-for="(chat, index) in 30" :key="index" class="chats-list-item">
            <div class="chats-list-item-avatar">
                <!-- <img src="../assets/user.svg" alt="avatar"> -->
            </div>
            <div class="chats-list-item-content"></div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
