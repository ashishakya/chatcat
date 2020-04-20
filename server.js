'use strict'

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8001)


app.get('/', (req, res, next) => {
    res.send('<h1>Hello from express</h1>');
})

app.get('/dashboard', (req, res, next)=>{
    res.send('<h1>Hey this is dashboard!!</h1>')
})

app.listen(app.get('port'), () => {
    console.log('Chat cat running in port: ', app.get('port'));
})
