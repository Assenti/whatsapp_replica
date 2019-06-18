const express = require('express')
const router = express.Router()
const { verifyToken } = require('../services/jwtService')
const authCtrl = require('../controllers/authCtrl')
const userCtrl = require('../controllers/userCtrl')

router.post('/login', authCtrl.login)
router.post('/register', userCtrl.register)

module.exports = router