var MainView = require('./main');


window.app = {
    init: function () {
        new MainView({
            app: this
        });
    }
};

require('domready')(window.app.init.bind(window.app));
