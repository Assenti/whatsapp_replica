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
                        @click="openNewChat">
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
                            <div class="menu-item"
                                v-for="(item, index) in menuItems"
                                :key="index" 
                                @click="item.func">{{ item.title }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-search-block">
                <form-field
                    v-model="search"
                    placeholder="Search or start new chat" 
                    icon="search"/>
            </div>
            <chats-list :chats="filteredChats"
                @clicked="openChat"/>
        </div>
        <transition name="animations" 
            enter-active-class="animated slideInLeft faster"
            leave-active-class="animated slideOutLeft faster">
            <drawer v-if="drawer" :header="currentDrawerHeader">
                <template slot="content">
                    <new-chat v-if="newChat"/>
                    <profile v-if="profile"/>
                </template>
            </drawer>
        </transition>
        <chat-box/>
    </div>
</template>

<script>
import ChatBox from '@/components/ChatBox'
import ChatsList from '@/components/ChatsList'
import Drawer from '@/components/Drawer'
import NewChat from '@/components/NewChat'
import Profile from '@/components/Profile'
import { backendService } from '@/services/backendService'
import { bus } from '@/main'

export default {
    components: {
        ChatBox, 
        ChatsList, 
        Drawer, 
        NewChat,
        Profile
    },
    data() {
        return {
            menu: false,
            drawer: false,
            chats: [],
            search: '',
            currentDrawerHeader: '',
            newChat: false,
            profile: false,
            menuItems: [
                { title: 'Profile', func: this.openProfile },
                { title: 'Log out', func: this.logout }
            ]
        }
    },
    created() {
        bus.$on('closeDrawer', () => this.closeDrawer())
    },
    mounted() {
        if(this.chats.length == 0) {
            this.getUserChats()
        }
    },
    computed: {
        filteredChats() {
            if(this.search) {
                return this.chats.filter(chat => {
                    let filtered = chat.users.filter(user => {
                        return this.$store.getters.getUserId !== user._id
                    })
                    return filtered[0].firstname.toLowerCase().includes(this.search.toLowerCase()) ||
                        filtered[0].lastname.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            else {
                return this.chats
            } 
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('unsetUser')
            this.menu = false
        },
        openNewChat() {
            this.drawer = this.newChat = true
            this.currentDrawerHeader = 'New Chat'
        },
        openProfile() {
            this.drawer = this.profile = true
            this.menu = false
            this.currentDrawerHeader = 'Profile'
        },
        openChat(chat) {
            bus.$emit('openChat', chat)
            this.$store.dispatch('setActiveChat', chat)
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
        },
        closeDrawer() {
            this.drawer = false
            this.newChat = false
            this.profile = false
        }
    }
}
</script>

