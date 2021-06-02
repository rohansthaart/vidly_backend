const express = require('express');
const {Genre} = require('../models/genre')
const mongoose = require('mongoose');
const {validate, Movies, movieValidation} = require('../models/movie')

const router = express.Router();




router.get('/',async (req,res)=>{
    const movies = await Movies.find().sort('name');
    res.send(movies);
   
})

router.get('/:id',async (req,res)=>{
    const movie = await Movies.findById()
    if(!movie)return res.status(404).send('movie with that id is not available')
    res.send(movie)
})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre')

    const movie = new Movies({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    await movie.save();

    res.send(movie);
})

router.put('/:id', async (req,res)=>{
const {error} = validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const movie = await Movies.findByIdAndUpdate(req.params.id,{
    title:params.body.title,
    genre:{
        _id:genre._id,
        name:genre.name
    },
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
    },
    {new:true}
);
if(!movie) return res.status(404).send("Movie with the given ID was not found")
res.send(movie)
})



router.delete('/:id', async (req,res)=>{
   
    const movies = await Movies.findByIdAndRemove(req.params.id)
    if(!movie) res.status(404).send('Movie with the given ID was not found')
    res.send(movies)
})

module.exports = router;