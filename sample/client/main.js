var MainView = require('../../ampersand-main-view');
var dom = require('ampersand-dom');
var nav = require('./navTemplate');


module.exports = MainView.extend({
    template: '<div><nav data-hook="navigation">' + nav +'</nav><h1>Page:</h1><div data-hook="page"></div></div>',
    router: require('./router'),
    events: {
        'mouseover h1': 'underlineIt',
        'mouseout h1': 'underlineIt',
        'mouseover h2': 'underlineIt',
        'mouseout h2': 'underlineIt',
        'click .hash-link': 'clickHashLink',
        'click .unprevented-hash-link': 'clickUnpreventedHashLink'
    },
    underlineIt: function (e) {
        var t = e.target;
        var className = 'underlined';
        dom[dom.hasClass(t, className) ? 'removeClass' : 'addClass'](t, className);
    },
    clickHashLink: function (event) {
        event.preventDefault();
        var div = document.createElement('div');
        div.innerHTML = 'nav link clicked';
        this.currentPage.el.appendChild(div);
    },
    clickUnpreventedHashLink: function () {}
});
