const Chat = require('../models/Chat')
const User = require('../models/User')

// New Chat Creatiion
exports.createChat = (req, res) => {
    const { creator, participant } = req.body
    let chat = new Chat()
    chat.users.push(creator)
    chat.users.push(participant)

    chat.save((err, newChat) => {
        if(err) {
            res.status(500).send('Error occurred while creating chat')
        }
        else {
            User.findById(creator)
            .exec((err, foundedCreator) => {
                if(err) {
                    res.status(500).send('Error occuredd while searching user-creator')
                }
                else {
                    User.findById(participant)
                    .exec((err, foundedParticipant) => {
                        if(err) {
                            res.status(500).send('Error occuredd while searching user-participant')
                        }
                        else {
                            foundedCreator.chats.push(newChat._id)
                            foundedCreator.save((err, savedCreator) => {
                                if(err) {
                                    res.status(500).send('Error occuredd while updating user-creator')
                                }
                                else {
                                    foundedParticipant.chats.push(newChat._id)
                                    foundedParticipant.save((err, savedParticipant) => {
                                        if(err) {
                                            res.status.send('Error occurred while updating user-participant')
                                        }
                                        else {
                                            res.send(newChat)
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

// Get user chats list
exports.getChats = async (req, res) => {
    const { id } = req.query
    try {
        const user = await User.findById(id)
        .populate('chats')
        .populate({ 
            path: 'chats',
            populate: 'users'
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