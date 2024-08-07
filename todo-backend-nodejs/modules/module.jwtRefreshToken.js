const jwt = require('jsonwebtoken');

const jwtRefreshToken= (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY_FOR_JWT, { algorithm: 'HS256' })
  return token;
}

module.exports = jwtRefreshToken;