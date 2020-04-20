'use strict';

if (process.env.NODE_ENV === 'production') {
    //offer production stage env variables
    module.exports = {
        host: process.env.host || '',
        dbURI: process.env.DBURI || ''
    }
} else {
    // offer dev stage settings and data
    module.exports = require('./development.json');
}
