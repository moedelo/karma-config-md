/*global module*/
const merge = require('merge');

module.exports = function(options, settings = {}) {
    return function(config) {
        const karmaConf = settings.type === 'root' ? require('./karma.root.conf.js') : require('./karma.conf.js');
        const karmaOptions = options ? merge(true, karmaConf(config), options) : karmaConf(config);
        config.set(karmaOptions);
    };
};