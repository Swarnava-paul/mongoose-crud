const bcrypt = require('bcrypt');

const hashPassword = (plainTextPassword) => {
    const password = bcrypt.hashSync(plainTextPassword,5);
    return password;
}

module.exports = hashPassword;