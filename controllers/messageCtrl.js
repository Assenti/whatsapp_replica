const Message = require('../models/Message')
const Chat = require('../models/Chat')

// Get current chat messages
exports.getChatMessages = async (req, res) => {
    const { chatId, page } = req.query
    try {
        let messages = await Message.find({ chatId: chatId })
        .skip((page - 1) * 100)
        .limit(100)
        .sort({ createdAt: -1 })
        .exec()

        res.send(messages)
    }
    catch (e) {
        res.status.send('Error occurred while fetching chat messages')
    }
}