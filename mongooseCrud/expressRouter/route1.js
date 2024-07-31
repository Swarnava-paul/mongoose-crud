
const express = require('express') ;
const router = express.Router() ;

const UserModel = require('../schemas/db.userSchema') // useermodel for schema 
const ProductModel = require('../schemas/db.productSchema') // product Schema


router.use(express.json()) // to receive incoming requests body


router.get('/getAllUsers',async(req,res)=>{
    try{
        
        const users = await UserModel.find({})
        res.end(JSON.stringify(users))
       
    }catch(error) {
        
        res.end('Error')
    }
})

router.post('/users',async(req,res)=>{
 try{
    
    const user = new UserModel(req.body);
    const checkUserExistance = await UserModel.find({name:user.name});

    if(checkUserExistance.length == 0) {
        await user.save();
        res.status(201).end('User created successfully')
    }
    else {
        res.end('User Already Exist')
    }

 }catch(error) {
    res.end('Unsuccessfull');
 }
})

router.patch('/users',async(req,res)=>{
    try{
      const {name} = req.body ;
      const updatedUser = await UserModel.findOneAndUpdate({name:name},{...req.body},{new:true})
      res.json(updatedUser).end('User updated successfully')
    }catch(error) {
      res.end('error')
    }
})

router.delete('/users',async(req,res)=>{
  const {name} = req.body;
  try{
    
    await UserModel.deleteOne({name:name})
    res.end('user deleted successfull')

  }catch(error) {
    res.end('User delete not successfull')
  }
})

// above apis for users


router.post('/products',async(req,res)=>{
 
 try{

    const product = new ProductModel(req.body) ;
    await product.save()
    res.end('success')
 }catch(error) {
   res.end(error)
 }

})

router.get('/products',async (req,res)=>{
 
    try{
      const products = JSON.stringify(await ProductModel.find({}))
      res.status(200).end(products)
    }catch(error) {
      res.end('Failed')
    }

})

router.patch('/products',async(req,res)=>{

 try{
  const {_id} = req.body
  const payload = req.body;
  const updatedProduct = await ProductModel.findOneAndUpdate({_id:_id},{...payload})
  res.end('success')
 }catch(error) {
   console.log(error);
   res.json(error)
 }

})




module.exports = router;