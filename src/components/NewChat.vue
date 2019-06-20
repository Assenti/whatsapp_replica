<template>
    <div class="new-chat">
        <div class="new-chat-search-block">
            <form-field placeholder="Search contacts" 
                icon="search"/>
        </div>
        <div class="new-chat-list">
            <chats-list :chats="[1,2,3]">
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
                <template slot="other">
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
        </div>
    </div>
</template>

<script>
import ChatsList from '@/components/ChatsList'
export default {
    components: {
        ChatsList
    },
    data() {
        return {

        }
    }
}
</script>

