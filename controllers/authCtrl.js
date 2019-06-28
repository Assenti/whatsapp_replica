const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwtSecret, session } = require('../config')
const base64 = require('../services/decodeService')

// Login
exports.login = async (req, res) => {
    const { login, password, remember } = req.body
    
    try {
        const user = await User.findOne({ email: login }).exec()
        if(!user) {
            res.status(400).send('You have no registration yet')
        }
        else if(password === user.password) {
            let sessionDuration = {}
            let token 

            // Check if Remember checkbox is true
            if(remember) {
                sessionDuration = { expiresIn: session }
                token = await jwt.sign(user.toJSON(), jwtSecret, sessionDuration)
            }
            token = await jwt.sign(user.toJSON(), jwtSecret)

            // Collect user info to send to front end
            let userInfo = {
                _id: user._id,
                createdAt: user.createdAt,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                avatar: user.avatar ? user.avatar : '',
                status: user.status ? user.status : '',
                token: token
            }

            // Encode the user info
            const sessionInfo = base64.encode(JSON.stringify(userInfo))
            res.send(sessionInfo)
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Error occured while signing in')
    }
}

exports.checkSession = (req, res) => {
    res.sendStatus(200)
}
