var MainView = require('../../ampersand-main-view');
var dom = require('ampersand-dom');

module.exports = MainView.extend({
    template: require('./templates').main,
    router: require('./router'),
    events: {
        'click h1': 'headerClick',
        'click h2': 'headerClick'
    },
    headerClick: function (e) {
        var t = e.target;
        var className = 'clicked';
        dom[dom.hasClass(t, className) ? 'removeClass' : 'addClass'](t, className);
    }
});
