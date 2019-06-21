<template>
    <div class="new-chat">
        <div class="new-chat-search-block">
            <form-field placeholder="Search contacts" 
                v-model="search"
                icon="search"/>
        </div>
        <div class="new-chat-list">
            <chats-list :chats="frequentlyChats">
                <template slot="list-item">
                    <div class="chats-list-item">
                        <div class="chats-list-item-avatar wa-green-dark">
                            <icon icon="group_add" 
                                color="white" 
                                size="28"/>
                        </div>
                        <div class="chats-list-item-content">
                            <div class="chats-list-item-title">
                                <div>New group</div>
                            </div>
                        </div>
                    </div>
                </template>
                <template slot="other" v-if="frequentlyChats.length > 0">
                    <div class="chats-list-item-disabled">
                        <div class="chats-list-item-content" style="width: 100%">
                            <div class="chats-list-item-title">
                                <div class="text-wa-green pl-20">
                                    FREQUENTLY CONTACTED</div>
                            </div>
                        </div>
                    </div>
                </template>
            </chats-list>
            <users-list :users="searchedContacts">
                <template slot="other" v-if="searchedContacts.length > 0">
                    <div class="chats-list-item-disabled">
                        <div class="chats-list-item-content" style="width: 100%">
                            <div class="chats-list-item-title">
                                <div class="text-wa-green pl-20">
                                    CONTACTS</div>
                            </div>
                        </div>
                    </div>
                </template>
            </users-list>
        </div>
    </div>
</template>

<script>
import ChatsList from '@/components/ChatsList'
import UsersList from '@/components/UsersList'
import { backendService } from '@/services/backendService'

export default {
    components: {
        ChatsList, UsersList
    },
    data() {
        return {
            frequentlyChats: [],
            searchedContacts: [],
            search: ''
        }
    },
    watch: {
        search(value) {
            if(value) {
                let self = this
                setTimeout( async() => {
                    try {
                        backendService.setJwt()
                        const res = await backendService.http.get(`/searchContacts?query=${value}`)
                        self.searchedContacts = res.data
                    }
                    catch (e) {
                        console.log(e)
                    }
                }, 700)
            }
            else {
                this.searchedContacts = []
            }
        }
    },
    methods: {
        
    }
}
</script>

