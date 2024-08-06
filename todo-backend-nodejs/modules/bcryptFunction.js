const bcrypt = require('bcrypt')

const hashPassword = (password) =>{
  const hash = bcrypt.hashSync(password,5);
  return hash;
}

module.exports = hashPassword;