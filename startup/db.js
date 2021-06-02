const winston = require('winston')
const mongoose = require('mongoose');

module.exports = function() {
  
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})  
        .then(()=>winston.info('Connected to MongoDB'))
        .then(()=>console.log(process.env.MONGO_URI))

}