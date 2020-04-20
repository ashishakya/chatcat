'use strict'

const express = require('express');
const app = express();
const chatCat = require('./app');

app.set('port', process.env.PORT || 8001);
// setting templating engine
app.set('view engine', 'ejs');
// middleware function to serve static file
app.use(express.static('public'));
// setting routes;
app.use('/', chatCat.router);


app.listen(app.get('port'), () => {
    console.log('Chat cat running in port: ', app.get('port'));
})
