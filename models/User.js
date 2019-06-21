const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
    email: { type: String, unique: true },
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    password: String,
    status: { type: String, default: 'Hey there! I am using WhatsApp Replica.'},
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('User', UserSchema)