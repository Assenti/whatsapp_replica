const express = require('express')
const router = express.Router()
const { verifyToken } = require('../services/jwtService')
const authCtrl = require('../controllers/authCtrl')
const userCtrl = require('../controllers/userCtrl')
const chatCtrl = require('../controllers/chatCtrl')
const messageCtrl = require('../controllers/messageCtrl')

// Users API
router.post('/login', authCtrl.login)
router.post('/register', userCtrl.register)
router.get('/searchContacts', verifyToken, userCtrl.searchUser)

// Chats API
router.post('/chat', verifyToken, chatCtrl.createChat)
router.delete('/chat', verifyToken, chatCtrl.deleteChat)

module.exports = router