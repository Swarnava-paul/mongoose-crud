
const UserModel = require("../models/model.user")

const authorizationMiddleware = (rolesArray) => {

 return async(req,res,next) => {
   try{
      const {id} = req.user;
      const {role} = await UserModel.findOne({_id:id});
      let result = false;

      rolesArray.map(function(i,index){
         role.map(function(i1,index1){
            if(rolesArray[index] === role[index1]) {
               result = true;
            }
         })       
      })

      if(result) {
        req.role = role;
        return next() ;
      }
      return res.status(400).json({message:"you are Not Authorized to access this route"})

   } catch(error) {

      return res.status(404).json({message:"Internal server error"});
   }
}

}

module.exports = authorizationMiddleware;