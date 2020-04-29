'use strict'

const express = require('express');
const app = express();
const chatCat = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 8001);

// setting templating engine
app.set('view engine', 'ejs');

// middleware function to serve static file
app.use(express.static('public'));

// setting up session middleware. This has to be strictly placed before route is mounted.
app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());

// setting routes;
app.use('/', chatCat.router);


app.listen(app.get('port'), () => {
    console.log('Chat cat running in port: ', app.get('port'));
})
