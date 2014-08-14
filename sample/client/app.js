var MainView = require('./main');


window.app = {
    init: function () {
        new MainView({
            app: this
        });
    }
};


require('domready')(function () {
    // UGHWHAT? IE9 fails without this setTimeout
    setTimeout(function () {
        window.app.init();
    }, 1);
});
