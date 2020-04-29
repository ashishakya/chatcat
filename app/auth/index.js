'use strict';

const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = () => {
    // the serialise user function is invoked then our authorisation process ends
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        h.findById(id)
            .then(user=>done(null, user))
            .catch(error=>console.log('Error when deserialize user in auth:index'))
    })

    let authProcessor = (accessToken, refreshToken, profile, done) => {
        h.findOne(profile.id)
            .then(result => {
                if (result) {
                    // error, result
                    done(null, result);
                } else {
                    // create a new user and return
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => console.log("Error when creating new user in auth:index " + user))
                }
            })
        //Find a user in the local db using profile.id
        // if the user is found, return the user data using the done()
        // if the user is not found locally, create one in the local db and return
    };
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}
