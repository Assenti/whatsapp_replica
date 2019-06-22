<template>
    <div class="chat-room">
        <div class="chat-participants">
            <div class="chat-participants-toolbar">
                <div class="chats-participants-toolbar-avatar">
                    <img src="../assets/user.png" alt="avatar">
                </div>
                <div class="flex align-center">
                    <div tabindex="-1"
                        class="no-outline" 
                        @blur="drawer = false" 
                        @click="drawer = true">
                        <icon icon="chat" 
                        title="New chat" 
                        class="mx-10"/>
                    </div>
                    <div class="menu-wrapper" 
                        tabindex="-1"
                        @click="menu = true"
                        @blur="menu = false">
                        <icon icon="more_vert" title="Menu"/>
                        <div class="menu" v-if="menu">
                            <div class="menu-item">Profile</div>
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
            <chats-list :chats="chats"
                @clicked="openChat"/>
        </div>
        <transition name="animations" 
            enter-active-class="slideInLeft"
            leave-active-class="slideOutRight">
            <right-drawer v-if="drawer">
                <template slot="content">
                    <new-chat/>
                </template>
            </right-drawer>
        </transition>
        <chat-box/>
    </div>
</template>

<script>
import ChatBox from '@/components/ChatBox'
import ChatsList from '@/components/ChatsList'
import RightDrawer from '@/components/RightDrawer'
import NewChat from '@/components/NewChat'
import { backendService } from '@/services/backendService'
import { bus } from '@/main'

export default {
    components: {
        ChatBox, ChatsList, RightDrawer, NewChat
    },
    data() {
        return {
            menu: false,
            drawer: false,
            chats: []
        }
    },
    created() {
        bus.$on('closeDrawer', () => this.drawer = false)
    },
    mounted() {
        if(this.chats.length == 0) {
            this.getUserChats()
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('unsetUser')
            this.menu = false
        },
        newChat() {
            this.drawer = true
        },
        openChat(chat) {
            bus.$emit('openChat', chat)
            this.$socket.emit('chatEntered', { chatId: chat._id })
        },
        async getUserChats() {
            bus.$emit('preloaderOn')
            try {
                const id = this.$store.getters.getUserId
                backendService.setJwt()
                const res = await backendService.http.get(`/chats?id=${id}`)
                this.chats = res.data
            }
            catch (e) {
                console.log(e)
                if(e.response.status == 401) {
                    this.$store.dispatch('unsetUser')
                }
            }
            finally {
                bus.$emit('preloaderOff')
            }
        }
    }
}
</script>

