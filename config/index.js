module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: 'mongodb://wa-app:wa2019!@ds239157.mlab.com:39157/wa-replica',
    jwtSecret: 'wa-jwtKey',
    mailConfig: {
        host: 'smtp.gmail.com',
        port: '587',
        secure: false, 
        auth: {
            user: 'testyfy7@gmail.com', 
            pass: 'qwgqebnounjwnmfo'   
        }
    },
    session: '1h',
    // devHost: 'http://localhost:3000',
    devHost: 'http://192.168.1.138:3000'
}