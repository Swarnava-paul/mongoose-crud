const jwt = require('jsonwebtoken')

const checkAuthentication = (req,res,next) => {
 const token = req.headers['authorization'].split(" ")[1];
if(token){
  jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
    if(decode) {
        req.user = decode;
        next();
    }
  })
}else {
    res.status(404).json({massage:"Please Login First"})
}
 
}

module.exports = checkAuthentication;