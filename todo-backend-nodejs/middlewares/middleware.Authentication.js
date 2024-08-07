const jwt = require('jsonwebtoken');
const jwtAccessToken = require("../modules/module.jwtAccessToken");

const BlackListedTokenModel = require('../models/model.refreshToken')

const checkAuthentication = (req,res,next) => {
  const AccessToken = req.headers['authorization'].split(" ")[1];
  const RefreshToken = req.headers['authorization'].split(" ")[2];

  if(AccessToken) {
    jwt.verify(AccessToken,process.env.SECRET_KEY_FOR_JWT,async(err,decode)=>{

      if(decode) {
        req.user = decode;
        next();
      }else{
        if(RefreshToken) {
          
          const findRefreshToken = await BlackListedTokenModel.find({});
          const check = findRefreshToken[0].blackListedTokens.includes(RefreshToken)
          if(check) {
            return res.status(404).json({message:"Please Login"})
          }
          const decoDedRefreshToken= decodeJwt(RefreshToken)
          const newAccessToken = jwtAccessToken(decoDedRefreshToken)
        
          if(newAccessToken) {
            req.user = decoDedRefreshToken;
            req.accessToken = newAccessToken;
            next()
          }else {
            res.status(400).json({message:"Please Login Again Due to some internal issue"})
          }
         //res.status(400).json({message:"Invalid Token"})
        } else {
          res.status(500).json({message:'Please provide refresh token'})
        }
      }
   
     })
  } else {
    res.status(404).json({message:"No token Provided"})
  }
}


const decodeJwt = (token)=>{
  let decodedToken = jwt.verify(token,process.env.SECRET_KEY_FOR_JWT)
  return decodedToken;
}
module.exports = checkAuthentication;