
const checkAuthrization = async(req,res,next)=>{
 if(req.user.role === 'admin') {
    next();
 }else{
    res.status(404).json({
        massage:"You are not Authorized to access this route",
    })
 }
}

module.exports = checkAuthrization;