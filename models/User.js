const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
    email: { type: String, unique: true },
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    password: String,
    status: String,
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
})

module.exports = mongoose.model('User', UserSchema)