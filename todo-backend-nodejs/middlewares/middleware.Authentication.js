const jwt = require('jsonwebtoken');

const checkAuthentication = (req,res,next) => {
  const token = req.headers['authorization'].split(" ")[1];
  if(token) {
    jwt.verify(token,process.env.SECRET_KEY_FOR_JWT,(err,decode)=>{

      if(decode) {
        req.user = decode;
        next();
      }else {
       res.status(400).json({message:"Invalid Token"})
      }
   
     })
  } else {
    res.status(404).json({message:"No token Provided"})
  }
}

module.exports = checkAuthentication;