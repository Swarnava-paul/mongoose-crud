const bcrypt = require('bcrypt');

const CompareBcrypt = (plainPassword,hashedPassword)=>{
const result = bcrypt.compareSync(plainPassword,hashedPassword);
return result;

}


module.exports = CompareBcrypt;