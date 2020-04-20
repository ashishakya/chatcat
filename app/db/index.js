'use strict'

const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//log and error if the connection fails

Mongoose.connection.on('error', error => {
    console.log("mongo db error: " + error)
})

module.exports = {
    Mongoose
}
