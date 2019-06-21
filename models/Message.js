const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }
})

module.exports = mongoose.model('Message', MessageSchema)