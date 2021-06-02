const express = require('express');
const genres = require('../routers/genres')
const error = require('../middleware/error')
const customers = require('../routers/customers')
const movies = require('../routers/movies')
const rental = require('../routers/rentals')
const users = require('../routers/users')
const auth = require('../routers/auth')

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/genres', genres)
    app.use('/api/customers', customers)
    app.use('/api/movies',movies)
    app.use('/api/rentals', rental)
    app.use('/api/users', users)
    app.use('/api/auth',auth)

    app.use(error)
}