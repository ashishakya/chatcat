'use strict'

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8001)
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('login');
})

app.listen(app.get('port'), () => {
    console.log('Chat cat running in port: ', app.get('port'));
})
