'use strict';

// channel all modules through single window
module.exports = {
    router: require('./routes')(),
    session: require('./session')
}
