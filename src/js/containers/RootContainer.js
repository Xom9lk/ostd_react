/**
 * Created by Игорь on 03.01.2016.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./RootContainer.prod.js');
} else {
    module.exports = require('./RootContainer.dev.js');
}