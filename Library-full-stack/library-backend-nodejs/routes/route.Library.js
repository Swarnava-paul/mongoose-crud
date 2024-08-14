const express = require('express');

const LibraryRouter = express.Router();

LibraryRouter.use(express.json());

// middlewares
const authorizationMiddleware = require('../middleware/middleware.Authorization')

//models
const BookModel = require('../models/model.book');
const UserModel = require('../models/model.user');

LibraryRouter.post('/createBook',authorizationMiddleware(["CREATOR"]),async(req,res)=>{
 try{
   const {id,name} = req.user;

   const book = await BookModel.create({...req.body,creatorId:id,publishedBy : name})
   
   if(book){
    return res.status(200).json({message:"Book Created Successfully"});
   }
   return res.status(404).json({message:"Book Not Created Try Again Later"})

 } catch(error) {
   res.status(500).json({message:"Internal Server Error"})
 }
})

LibraryRouter.get('/books',authorizationMiddleware(['VIEWER','CREATOR']),async(req,res)=>{
 
  try{

    if(req.query.bookName) {
      const {bookName} = req.query;
      const books = await BookModel.find({title:{$regex:new RegExp (bookName, 'i')}})
      const {name} = await UserModel.findOne({_id:books[0].creatorId});

      if(!books || books.length === 0) {
        return res.status(200).json({message:"No Books Found With this Name"})
      }
      return res.status(200).json({message:"Books Found",books , publishedBy : name})
      
    }
    
    const role = req.role
    if(role.includes("CREATOR")) {
      // if this true user with permission creator or viewer able
      // to view there all created books
      // must be able to view his all created books
      const {id,name} = req.user;
      
      const limit = 5;
      let skip = 0;
      if(req.query.page) {
        const {page} = req.query;
        if(page > 1) {
          skip = (limit * page) - limit ;
        }
      }

      const books  = await BookModel.find({creatorId:id}).skip(skip).limit(limit);
      if(books.length > 0) {
       return res.status(200).json({message:"Successful",books , length:books.length , publishedBy : name});
      }
      return res.status(404).json({message:"No Books Found please Publish One"});

    } else if (role.includes("VIEWER")) {
      // if this true user will able to see all books present in database
      const {name} = req.user;
      const limit = 5;
      let skip = 0;
      if(req.query.page) {
        const {page} = req.query;
        if(page > 1) {
          skip = (limit * page) - limit ;
        }
      }

      const books = await BookModel.find({}).skip(skip).limit(limit);
       if(books.length > 0) {
        return res.status(200).json({message:"Successful",books,length:books.length});
       }
       return res.status(404).json({message:"No Books Found"});
    }

  } catch(error) {
    res.status(500).json({message:"Internal Server Error"})
  }

})

LibraryRouter.patch('/updateBook',authorizationMiddleware(['CREATOR']),async(req,res)=>{
 
  try{
     
    if(req.query.bookId) {
      const {id} = req.user;
      const bookID = req.query.bookId;
      const updateBook = await BookModel.updateOne({_id:bookID,creatorId : id},{...req.body})
      if(updateBook) {
        return res.status(200).json({message:"Book Updated Successfully"})
      }
      return res.status(404).json({message:"Updating Failed"})
    }
    return res.status(404).json({message:"Please Provide Book Id For Deletion"})

  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
})

LibraryRouter.delete('/deleteBook',authorizationMiddleware(['CREATOR']),async(req,res)=>{
 
  try{
    const {id} = req.user;
    if(req.query.bookId) {
      const bookID = req.query.bookId;
      await BookModel.deleteOne({_id:bookID , creatorId : id});
      return res.status(200).json({message:"Book Deleted Successful"});
    }
    return res.status(404).json({message:"Please Provide Book Id"})
  }catch(error) {
    res.status(500).json({message:"Internal Server Error"})
  }

})





module.exports = LibraryRouter;