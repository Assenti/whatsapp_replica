const User = require('../models/User')
const Joi = require('@hapi/joi')
const config = require('../config')
const nodemailer = require('nodemailer')
const MAIL = `"WhatsApp Replica" <${config.mailConfig.auth.user}>`
const transporter = nodemailer.createTransport(config.mailConfig)

// Register new User
exports.register = (req, res) => {

    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    const schema = Joi.object().keys({
        firstname: Joi.string().regex(/^[a-zA-Z]+$/).required(),
        lastname: Joi.string().regex(/^[a-zA-Z]+$/).required(),
        password: Joi.string().alphanum().min(6).required(),
        email: Joi.string().email({ minDomainSegments: 2 })
    })

    const { error, value } = Joi.validate(data, schema)

    if(error){
        switch(error.details[0].context.key){
        case 'firstname':
            res.status(400).send('First name must contain letters only')
            break
        case 'lastname':
            res.status(400).send('Last name must contain letters only')
            break
        case 'email':
            res.status(400).send('Invalid Email address format')
            break
        case 'password':
            res.status(400).send('Password must be at least 6 characters')
            break
        default:
            res.status(400).send('Invaild registration credentials')
            break
        }
    }
    else {
        let user = new User(data)

        user.save((err, user)=> {
            if(err) res.status(500).send('Error occurred while creating a user')
            else {
                let mailOptions = {
                    from: MAIL, 
                    to: user.email, 
                    subject: 'Registration Confirmation', 
                    html: `<div>You're successfully registered on WhatsApp Replica web application.</div>`
                }
                transporter.sendMail(mailOptions, (error, info)=> {
                    if(err) res.status(401).send('Invalid email credentials')
                    else res.status(200).send(user)
                })
            }
        })
    }
}

// Search User
exports.searchUser = async (req, res) => {
    const { query } = req.query
    const myRegExp = new RegExp(`${query}`, 'i')
    console.log(myRegExp)
    try {
        let users = await User.find({
            $or: [
                { email: myRegExp },
                { firstname: myRegExp },
                { lastname: myRegExp }            
            ]
        }).limit(5).exec()
        
        res.send(users)
    }
    catch (e) {
        res.status(500).send('Error occurred while searching contact')
    }
}   

// Add new Contact 
exports.addContact = (req, res) => {
    
}