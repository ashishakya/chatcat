'use strict';

const router = require('express').Router();
const h = require('../helpers');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': (req, res, next) => {
                res.render('rooms');
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            },
            '/set-session': (req, res, next) => {
                req.session.hello = 'biku';
                res.send('Session has been set.');
            },
            '/get-session': (req, res, next) => {
                res.send('session get: ' + req.session.hello);
            },
        },
        'post': {},
        'na':(req, res, next)=>{
            res.status(400).sendFile(process.cwd() + '/views/404.htm');
        }
    }

    return h.route(routes);
}
