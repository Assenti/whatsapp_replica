const Message = require('../models/Message')
const Chat = require('../models/Chat')

class MessageService {
    // New message adding
    addMessage(chatId, senderId, message) {
        return new Promise((resolve, reject) => {
            Chat.findById(chatId)
            .exec((err, chat) => {
                if(err) {
                    reject('Error occurred while searching chat')
                }
                else {
                    let msg = new Message()
                    msg.userId = senderId
                    msg.chatId = chatId
                    msg.text = message
                    
                    msg.save((err, createdMsg) => {
                        if(err) {
                            reject('Error occurred while adding message')
                        }
                        else {
                            chat.messages.push(createdMsg._id)
                            chat.save((err, updatedChat) => {
                                if(err) {
                                    reject('Error occurred while updating chat')
                                }
                                else {
                                    resolve(updatedChat)
                                }
                            })
                        }
                    })
                }
            })
        })
    }
}

module.exports = MessageService