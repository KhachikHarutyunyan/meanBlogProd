const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://admin:a123456@ds147190.mlab.com:47190/meanblogapp',
    secret: crypto,
    db: 'meanblogapp'
}


