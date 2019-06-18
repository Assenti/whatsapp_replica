const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
	if(typeof token !== 'undefined') {
        jwt.verify(token, jwtSecret, (err, auth) => {
            if(err) res.status(401).send('Token not provided or session is expired, please pass the authorization')
            else {
                next()
            }
        })
    } 
    else {
	    res.status(401).send('Token not provided or session is expired, please pass the authorization')
	}
}