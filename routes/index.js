const express = require('express')
const router = express.Router()
const { verifyToken } = require('../services/jwtService')
const authCtrl = require('../controllers/authCtrl')
const userCtrl = require('../controllers/userCtrl')
const chatCtrl = require('../controllers/chatCtrl')
const messageCtrl = require('../controllers/messageCtrl')

// Auth API
router.post('/login', authCtrl.login)
router.get('/session', verifyToken, authCtrl.checkSession)

// Users API
router.post('/register', userCtrl.register)
router.get('/searchContacts', verifyToken, userCtrl.searchUser)

// Chats API
router.post('/chat', verifyToken, chatCtrl.createChat)
router.get('/chats', verifyToken, chatCtrl.getChats)
router.get('/checkChat', chatCtrl.checkChat)
router.delete('/chat', verifyToken, chatCtrl.deleteChat)

// Messages API
router.get('/messages', verifyToken, messageCtrl.getChatMessages)

module.exports = router