const bcrypt = require('bcrypt');

const comparePassword = (plainPassword,hashedPassword) => {
    const comparedPassword = bcrypt.compareSync(plainPassword,hashedPassword);
    return comparedPassword;
}

module.exports = comparePassword;
