const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const { login, password } = req.body
    
    User.FindOne()
    
    res.status(400).send('Invalid login or password')
    
}