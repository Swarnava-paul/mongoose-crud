const UserModel = require('../models/model.user');

const checkAuthorization = (rolesArray) => {
 return async (req,res,next) => {
    const {id} = req.user;
    const {role} = await UserModel.findOne({_id:id});
    let roleChecking = undefined;
    rolesArray.map((i)=> {
        role.map((i1)=>{
            if(i == i1) {
              roleChecking = true;
            }
        })
    })
    if(roleChecking) {
    return next();
    }
    return res.status(400).json({message:"You are not Authorized to access this route"})
 }
}

module.exports = checkAuthorization;