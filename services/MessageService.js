const Message = require('../models/Message')
const Chat = require('../models/Chat')

class MessageService {
    // New message adding
    addMessage(chatId, senderId, message) {
        return new Promise(async (resolve, reject) => {
            try {
                let chat = await Chat.findById(chatId)
                let msg = new Message()
                msg.userId = senderId
                msg.chatId = chatId
                msg.text = message
                
                try {
                    let createdMsg = await msg.save()
                    chat.messages.push(createdMsg._id)
                    try {
                        const updatedChat = await chat.save()
                        try {
                            const result = await Chat.findById(updatedChat._id)
                            .populate('messages')
                            .exec()
                            resolve(result)
                        }
                        catch (e) {
                            reject('Error occurred while fetching new chat')
                        }
                    }
                    catch (e) {
                        reject('Error occurred while updating chat')
                    }
                }
                catch (e) {
                    reject('Error occurred while adding message')

                }
            }
            catch (e) {
                reject('Error occurred while searching chat')
            }
        })
    }
}

module.exports = MessageService