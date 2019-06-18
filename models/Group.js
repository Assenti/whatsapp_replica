const mongoose = require('mongoose')

const GroupSchema = mongoose.Schema({
    name: String,
    avatar: String,
    desc: String,
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Group', GroupSchema)