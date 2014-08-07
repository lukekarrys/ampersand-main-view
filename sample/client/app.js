var MainView = require('../../ampersand-main-view').extend({
    template: require('./templates').main,
    router: require('./router')
});


window.app = {
    init: function () {
        this.view = new MainView();
    }
};


require('domready')(window.app.init.bind(window.app));
