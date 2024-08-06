const jwt = require('jsonwebtoken');

const jwtSign = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY_FOR_JWT, { algorithm: 'HS256' })
  return token;
}

module.exports = jwtSign;