var MainView = require('./main');
var bind = require('lodash.bind');


window.app = {
    init: function () {
        this.view = new MainView();
        this.router = this.view.router;
        this.navigate = this.view.navigate;
    }
};

require('domready')(bind(window.app.init, window.app));
