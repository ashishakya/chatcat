'use strict';

const router = require('express').Router();
const db = require('../db');


// iterate through the routes object and mount the routes
// _for denoting as the private function
let _registerRoutes = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
            _registerRoutes(routes[key], key);
        } else {
            // register the routes for resolve
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            } else {
                router.use(routes[key]);
            }
        }
    }
}

let route = routes => {
    _registerRoutes(routes);
    return router;
}

// find a single user based on a key
let findOne = profileID => {
    return db.userModel.findOne({
        'profileId': profileID
    });
}

// create a new user and returns that instance
let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
        // returns error if any
        newChatUser.save(error => {
            if (error) {
                console.log('Error while creating new user in helper.index ' + error);
                reject();
            } else {
                resolve(newChatUser);
            }
        });
    })
}

let findById = id => {
    return new Promise((resolve, reject) => {
        db.userModel.findById(id, (error, user) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        })
    })
}

// a middleware that checks to see if the user is authenticated and logged in or not

let isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // this method is provided by passport
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    route,
    findOne,
    createNewUser,
    findById,
    isAuthenticated
}

