<template>
    <div class="chat-current">
        <div class="chat-box-toolbar">
            <div class="flex align-center">
                <div class="chats-participants-toolbar-avatar">
                    <img src="../assets/user.png" alt="avatar">
                </div>
                <div>{{ participant }}</div>
            </div>
            <div class="flex align-center">
                <icon title="Search..." icon="search"/>
                <icon title="Attach" class="mx-20" icon="attach_file"/>
                <icon title="Menu" icon="more_vert"/>
            </div>
        </div>
        <div class="chat-box-content">
            <div class="chat-box-message-container" 
                v-for="(msg, i) in messages" 
                :key="i"
                :class="{'own': defineType(msg) }">
                
                <div class="chat-box-message" 
                    :class="{'own': defineType(msg) }">
                    <div class="chat-box-message-tail" v-if="defineType"></div>
                    <div>{{ msg.text }}</div>
                    <span>{{ dateTime(msg) }}</span>
                    <div class="chat-box-message-tail" v-if="!defineType"></div>
                </div>
            </div>
            
        </div>
        <div class="chat-box-controls">
            <icon icon="mood" size="30"/>
            <form @submit.prevent="sendMsg"
                class="chat-box-message-send-block">
                <form-field class="chat-box-controls-field" 
                    placeholder="Type a message"
                    v-model="newMsg"/>
                <icon icon="mic" size="30" v-if="!newMsg"/>
                <icon icon="send"
                    size="30"
                    @click="sendMsg" 
                    v-else type="submit"/>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        chatData: Object
    },
    data() {
        return {
            currentData: this.chatData,
            messages: this.chatData.messages,
            newMsg: ''
        }
    },
    created() {
        this.sockets.subscribe('newMsg', data => {
            this.messages.push(data)
        })
        this.sockets.subscribe('newMsgToChat', data => {
            this.messages.push(data)
        })
    },
    computed: {
        participant() {
            let filtered = this.chatData.users.filter(user => {
                return this.$store.getters.getUserId !== user._id
            })
            return `${filtered[0].firstname} ${filtered[0].lastname}`
        }
    },
    methods: {
        sendMsg() {
            if(this.$socket.connected) {
                const data = {
                    chatId: this.chatData._id,
                    senderId: this.$store.getters.getUserId,
                    message: this.newMsg
                }
                this.$socket.emit('newMsg', data)
                this.$emit('clearField')  
                this.newMsg = ''
            }
            else {
                console.log('No connection to backend')
            }         
        },
        defineType(msg) {
            if(msg) {
                return this.$store.getters.getUserId === msg.userId
            }
        },
        dateTime(msg) {
            if(msg) {
                // const today = new Date().toISOString().substr(0, 10)
                // let temp = new Date(msg.createdAt)
                // const msgDate = temp.toISOString().substr(0, 10)
                // if(new Date(today) === new Date(msgDate)) {
                //     return new Date(msg.createdAt).toLocaleTimeString()
                // }
                // else {
                    return new Date(msg.createdAt).toLocaleDateString()
                // }
            }
        }
    }
}
</script>