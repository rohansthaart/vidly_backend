const express = require('express')
const {Rental,validate} = require('../models/rental') 
const router = express.Router();
const {Customer} = require('../models/customers')
const mongoose = require('mongoose')
const Fawn = require('fawn')
const {Movies} = require('../models/movie')

Fawn.init(mongoose)


router.get('/',async (req,res)=>{
    const rental = await   Rental.find().sort('-dateOut');
    res.send(rental)

})


router.post('/',async (req,res)=>{
    const {error} = validate(req.body)
    if(error)return res.status(400).send(error.details[0].message)
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer')
    
    const movie = await Movies.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid Movie')

    if(movie.numberInStock === 0)return res.status(400).send('Movie not available')

    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    });
    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies',{_id:movie._id},{
            $inc:{numberInStock:-1}
        })
        .run();
    }
    catch(ex){
        res.status(500).send('Something failed')
    }
    res.send(rental);
})

router.get('/:id', async (req,res)=>{
    const rental = await Rental.findById(req.params.id)

    if(!rental)return res.status(404).send("the rental with the given ID was not found ")
    res.send(rental);
})

module.exports = router