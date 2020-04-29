'use strict'

const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//log and error if the connection fails

Mongoose.connection.on('error', error => {
    console.log("mongo db error: " + error)
})

// Create a Schema that defines the structure for storing user Data
const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
})

// Turn the schema into a usable Model
// it helps to create new collection in mongo in the plural name of the defined model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose,
    userModel
}
