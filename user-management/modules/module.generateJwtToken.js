const jwt = require("jsonwebtoken");

const generateJwtToken = (payload) => {
 const token = jwt.sign({...payload},process.env.JWT_PRIVATE_KEY);
 return token;
}

module.exports = generateJwtToken;