
const jwt = require("jsonwebtoken")

const authenticationMiddleware = (req,res,next) => {
 
    if(!req.headers['authorization']) {
        return res.status(404).json({message:"Please Provide A token"})
    }

    const token = req.headers['authorization'].split(" ")[1];
    if(!token) {
      return res.status(404).json({message:"Please Provide a token in headers"})
    }
    
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=> {
      if(err) {
        return req.status(404).json({message:"Invalid Token Please Login Again"})
      } 
      req.user = decode;
      next();
    })

}


module.exports = authenticationMiddleware;