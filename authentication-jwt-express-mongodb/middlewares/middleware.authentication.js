const jwt = require('jsonwebtoken')

const checkAuthentication = async(req,res,next)=>{
    const token = req.params.Token;
    if(token){
      
      jwt.verify(token,'key123',(err,decode)=>{
         if(decode) {
            req.user = decode;
            next();
         }else{
            res.send("Error during verification")
         }
         
      })
       
    }else{
       res.send('Please Login First')
    }
    
   }

module.exports = checkAuthentication;