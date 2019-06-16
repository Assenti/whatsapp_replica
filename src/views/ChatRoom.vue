<template>
    <div class="chat-room">
        <div class="chat-participants">
            <div class="chat-participants-toolbar">
                <div class="chats-participants-toolbar-avatar">
                    <!-- <img src="../assets/user.svg" alt="avatar"> -->
                </div>
                <div>
                    <div class="menu-wrapper" 
                        tabindex="-1"
                        @click="menu = true"
                        @blur="menu = false">
                        <icon icon="more_vert">
                        </icon>
                        <div class="menu" v-if="menu">
                            <div @click="logout" class="menu-item">Log out</div>
                        </div>
                    </div>
                    
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
import { bus } from '@/main'

export default {
    components: {
        ChatBox, ChatsList
    },
    data() {
        return {
            menu: false
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('unsetUser')
            this.menu = false
        }
    }
}
</script>

