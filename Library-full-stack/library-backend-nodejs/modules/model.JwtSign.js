const jwt = require('jsonwebtoken');

function generateJwtToken (payload) {
    return token = jwt.sign(payload,process.env.JWT_SECRET_KEY);
}

module.exports = generateJwtToken;