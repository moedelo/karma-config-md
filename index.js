/*global module*/

module.exports = function(options, settings = {}) {
    return function(config) {
        const karmaConf = settings.type === 'root' ? require('./karma.root.conf.js') : require('./karma.conf.js');
        const karmaOptions = { ...karmaConf(config), ...options };
        config.set(karmaOptions);
    };
};