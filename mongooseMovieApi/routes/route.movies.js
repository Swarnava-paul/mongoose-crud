const express = require('express');

const router = express.Router();

router.use(express.json());

// movie model
const MovieModel = require('../models/model.movies')


router.get('/getMoviesByName/:title',async(req,res)=>{
 
const title = req.params.title;
 try{

  const movies = await MovieModel.find({title:{$regex:new RegExp(title,'i')}});

  (movies.length == 0 ? res.status(204).json({Error:'No content found'}) : res.status(200).json(movies))

 }catch(e) {
   res.status(404).end('Error')
 }

}) // get movies by name

router.get('/getMoviesById/:ID',async(req,res)=>{

    try {
      const Id = req.params.ID;
      const movies = await MovieModel.findById(Id)
      if(!movies) {
        res.status(204).json({Error:'No content found'})
      }else {
        res.status(200).json(movies)
      }

    }catch(e) {
       res.status(404).json(e)
    }
}) // get movies by id

router.get('/getMoviesByRating/:Rating',async(req,res)=>{
    
    try {
      const Rating = req.params.Rating;
      const movies = await MovieModel.find({rating:Rating})
      if(!movies || movies.length == 0) {
        res.status(204).json('Content not found');
      }else {
        res.status(200).json(movies)
      }

    } catch(e) {
      res.status(404).json({Error:e})
    }

}) //get movies by Rating

router.get('/getMoviesByReleaseYear/:Year',async(req,res)=>{
    
    try {
     
        const release_year = req.params.Year;
        const movies = await MovieModel.find({release_year});
        if(!movies || movies.length == 0) {
            res.status(204).end('Content not found')
        }else {
            res.status(200).json(movies)
        }

    } catch(e) {
       res.json({Error:e})
    }

}) //get movies by Release year

router.get('/getMoviesByType/:Type',async(req,res)=>{
    
   try{

    const movieType = req.params.Type;
    const movies = await MovieModel.find({genre:{$regex:new RegExp(movieType,'i')}})
    
    if(!movies || movies.length === 0) {
      res.status(204).end('Content not found')
    } else {
      res.status(200).json(movies)
    }

   }catch(e) {
     res.end('404')
   }

}) // get movies by Type

router.post('/insertMovie',async(req,res)=>{

 try{
  const newMovie = await MovieModel.create({...req.body});
  res.status(201).json({message:"Movie Created",Movie:newMovie})
 }catch(e) {
  res.status(404).end('Error for creating movie')
 }

}) // create new movie 

router.patch('/UpdateMovie/:ID',async(req,res)=>{
    
  try{
  
    const {updateBy} = req.body;
    let updatedMovie = undefined;

    if(updateBy == "ID") {
      const id = req.params.ID;
      const updateInfo = req.body;
      delete updateInfo.updateBy; // deleted the key updtaBy bcz this key is only for determining the update method
       updatedMovie = await MovieModel.findByIdAndUpdate(id,updateInfo,{new:true})
    } else {
      const idAsName = req.params.ID;
      updatedMovie = await MovieModel.updateOne({title:idAsName},{...req.body})
    }



    if(!updatedMovie || updatedMovie.length == 0 ) {
      res.status(404).json({massage:'Movie Not Updated please give proper details'})
    }
     else {
      res.status(200).json({massage:'Movie Updated successfully',movie:updatedMovie});
    }

  }catch(e) {
    res.status(404).json(e)
  }

})

router.delete('/deleteMovieById/:Id',async(req,res)=>{
    
   try{
     
     const id = req.params.Id;
     const deletedMovie = await MovieModel.findByIdAndDelete(id);

     if(!deletedMovie || deletedMovie.length === 0) {
        res.status(404).json({massage:'Movie Not Deleted'})
     }else {
      res.status(200).json({massage:'Movie Deleted successfull',movie:deletedMovie})
     }

   }catch(e) {
     res.status(404).json(e)
   }

}) // delete movie



module.exports = router;