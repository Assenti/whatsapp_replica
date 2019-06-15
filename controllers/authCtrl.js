exports.login = (req, res) => {
    const login = 'asseke@list.ru'
    const password = '1234'
    const credentials = req.body
    if(credentials.login === login &&
       credentials.password === password) {
        res.send({
            user: {
                login: login,
                token: 'token'
            }
        })
    }
    else {
        res.status(400).send('Invalid login or password.')
    }
}