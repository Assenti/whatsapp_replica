const Chat = require('../models/Chat')
const User = require('../models/User')

// New Chat Creatiion
exports.createChat = async (req, res) => {
    const { creator, participant } = req.body
    let chat = new Chat()
    chat.users.push(creator)
    chat.users.push(participant)

    try {
        const newChat = await chat.save()
        let foundedCreator = await User.findById(creator).exec()
        let foundedParticipant = await User.findById(participant).exec()
        foundedCreator.chats.push(newChat._id)
        foundedParticipant.chats.push(newChat._id)
        await foundedCreator.save()
        await foundedParticipant.save()
        res.send(newChat)
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Error occurred while creating chat')
    }
}

// Check is chat exists
exports.checkChat = async (req, res) => {
    console.log(req.query)
    const { userId, participantId } = req.query
    try {
        const chats = await Chat.find({ users: { $in: [userId ] }}).populate('users')
        for(const chat of chats) {
            if(chat.users[0]._id.toString() === userId && 
                chat.users[1]._id.toString() === participantId) {
                return res.send({ exists: true, chat: chat })
            }
        }
        res.send({ exists: false })
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Error occurred while checking chat')
    }
}

// Get user chats list
exports.getChats = async (req, res) => {
    const { id } = req.query
    try {
        const user = await User.findById(id)
        .populate('chats')
        .populate({ 
            path: 'chats',
            populate: ['users', 'messages']
        })
        .exec()
        res.send(user.chats)
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Error occurred while fetching user')
    }
}

// Existing Chat Removing
exports.deleteChat = (req, res) => {
    const { chatId, creatorId, participantId } = req.query
    Chat.remove({ _id: chatId })
    .exec((err, info) => {
        if(err) {
            res.status(500).send('Error occurred while removing chat')
        }
        else {
            User.findById(creatorId)
            .exec((err, creator) => {
                if(err) {
                    res.status(500).send('Error occurred while searching user-creator')
                }
                else {
                    creator.chats = creators.chats.filter(chat => {
                        return chat !== chatId
                    })
                    creator.save((err, savedCreator) => {
                        if(err) {
                            res.status(500).send('Error occurred while updating user-creator')
                        }
                        else {
                            User.findById(participantId)
                            .exec((err, participant) => {
                                if(err) {
                                    res.status(500).send('Error occurred while searching user-participant')
                                }
                                else {
                                    participant.chats = participant.chats.filter(chat => {
                                        return chat !== chatId
                                    })
                                    participant.save((err, savedParticipant) => {
                                        if(err) {
                                            res.status(500).send('Error occurred while updating user-participant')
                                        }
                                        else {
                                            res.sendStatus(200)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
