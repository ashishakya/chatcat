'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db  =require('../db')

if (process.env.NODE_ENV === 'production') {
    // initialise session with setting for production
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        // session by deafult memory ma save huncha. only ok for local
        store: new MongoStore({
            mongooseConnection: db.Mongoose.connection
        })
    });
} else {
    // initialise session with setting for local
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    });
}
