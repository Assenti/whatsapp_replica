const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Message', MessageSchema)