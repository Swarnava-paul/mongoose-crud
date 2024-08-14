
const bcrypt = require('bcrypt');

function hashPassword(plainTextPassword) {
 const hashed = bcrypt.hashSync(plainTextPassword,6);
 return hashed;
}

module.exports = hashPassword;