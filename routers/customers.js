const express = require('express');
const {Customer, validate} = require('../models/customers')
const mongoose = require('mongoose');

const router = express.Router()

router.get('/', async (req,res)=>{
    const customers = await Customer.find().sort('name')
    res.send(customers)

})

router.get('/:id', async (req,res)=>{
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("customer doesnot exist with this id number ")
    res.send(customer)

})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details)

   let customer = new Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone            
        })
        customer = await customer.save();
        res.send(customer);
})

router.put('/:id', async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details)

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {name:req.body.name,
         phone:req.body.phone, 
         isGold:req.body.isGold
        },
         {new:true})
    if(!customer) return res.status(404).send('The customer with this id number is not available')
    res.send(customer)
})

router.delete('/:id', async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer) return res.status(404).send('there is no customer with this id to be deleted')
    res.send(customer)
})

module.exports = router;