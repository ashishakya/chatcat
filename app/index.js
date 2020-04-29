'use strict';

// channel all modules through single window
require('./auth')();

module.exports = {
    router: require('./routes')(),
    session: require('./session')
}
