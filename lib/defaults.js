module.exports = function defaults(options, _defaults) {
    options = options || {};
    Object.keys(_defaults).forEach(function(key) {
        if (typeof options[key] === 'undefined') {
            options[key] = _defaults[key];
        }
    });
    return options;
};
