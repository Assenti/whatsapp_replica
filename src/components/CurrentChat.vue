<template>
    <div class="chat-current">
        <div class="chat-box-toolbar"></div>
        <div class="chat-box-content">
            <div class="chat-box-message" v-for="(msg, i) in messages" :key="i">
                {{ msg.text }}
            </div>
        </div>
        <div class="chat-box-controls">
            <icon icon="mood"/>
            <form @submit.prevent="sendMsg"
                class="chat-box-message-send-block">
                <form-field class="chat-box-controls-field" 
                    placeholder="Type a message"
                    v-model="newMsg"/>
                <icon icon="mic" v-if="!newMsg"/>
                <icon icon="send" 
                    color="green"
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
            messages: [
                { text: 'Some text'},
                { text: 'Some text'},
                { text: 'Some text'},
                { text: 'Some text'},
                { text: 'Some text'},
            ],
            newMsg: ''
        }
    },
    created() {
        this.sockets.subscribe('newMsg', data => {
            this.messages.push(data)
        })
    },
    mounted() {
        console.log(this.$socket)
    },
    methods: {
        sendMsg() {
            if(this.$socket.connected) {
                this.$socket.emit('newMsg', { text: this.newMsg })
                this.messages.push({ text: this.newMsg })
                this.$emit('clearField')  
                this.newMsg = ''
            }
            else {
                console.log('No connection to backend')
            }         
        }
    }
}
</script>