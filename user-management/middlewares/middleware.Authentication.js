
const jwt = require('jsonwebtoken')

const authenticationCheck = (req,res,next) => {
 
    if(req.headers['authorization']) {

        const token = req.headers['authorization'].split(" ")[1];
        if(!token) {
            return res.status(400).json({message:"Please Provide token"})
        }

        jwt.verify(token,process.env.JWT_PRIVATE_KEY,(err,decode)=>{

            if(err) {
            return res.status(400).json({message:"Invalid Token"})
            } else {
            req.user = decode;
            next();
            }
           
        })

    } else {
        return res.status(404).json({message:"Please provide Headers of Authorization"})
    }
}


module.exports = authenticationCheck;