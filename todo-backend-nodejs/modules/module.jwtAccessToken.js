const jwt = require('jsonwebtoken');

const jwtAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY_FOR_JWT, { algorithm: 'HS256',expiresIn:120})
  return token;
}

module.exports = jwtAccessToken;