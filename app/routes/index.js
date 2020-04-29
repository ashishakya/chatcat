'use strict';

const router = require('express').Router();
const h = require('../helpers');
const passport = require('passport');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': [h.isAuthenticated, (req, res, next) => {
                res.render('rooms', {
                    user: req.user
                });
            }],
            '/chat': [h.isAuthenticated, (req, res, next) => {
                res.render('chatroom', {
                    user: req.user
                });
            }],
            '/set-session': (req, res, next) => {
                req.session.hello = 'biku';
                res.send('Session has been set.');
            },
            '/get-session': (req, res, next) => {
                res.send('session get: ' + req.session.hello);
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/logout': (req, res, next) => {
                req.logout(); // it is made available by passport. it also removes req.user
                res.redirect('/');
            }
        },
        'post': {},
        'na': (req, res, next) => {
            res.status(400).sendFile(process.cwd() + '/views/404.htm');
        }
    }

    return h.route(routes);
}
