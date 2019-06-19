const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwtSecret, session } = require('../config')

exports.login = (req, res) => {
    const { login, password } = req.body
    
    User
    .findOne({ email: login })
    .exec((err, user) => {
        if(!err) {
            if(password === user.password) {
                jwt.sign(user.toJSON(), jwtSecret, { expiresIn: session }, (err, token) => {
                    if(err) { 
                        console.log(err)
                        res.status(500).send('Error occured while signing in')
                    }
                    else {
                        user.token = token
                        res.send({
                            _id: user._id,
                            createdAt: user.createdAt,
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            avatar: user.avatar ? user.avatar : '',
                            status: user.status ? user.status : ''
                        })
                    }
                })
            }
            else {
                res.status(400).send('Invalid login or password')
            }
        }
        else if(!user) {
            res.status(400).send('You have no registration yet')
        }
        else if(err) {
            req.status(500).send('Error occurred while signing in')
        }
    })
}
