var MainView = require('../../ampersand-main-view');
var dom = require('ampersand-dom');

module.exports = MainView.extend({
    template: '<div><nav role="navigation"><ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/page1">Page 1</a></li><li><a href="/page2">Page 2</a></li><li><a href="#hash-link" class="hash-link">Hash link</a><li><a href="#" class="hash-link">Hash link</a></li></ul></nav><h1>Page:</h1><div role="page"></div></div>',
    router: require('./router'),
    events: {
        'mouseover h1': 'underlineIt',
        'mouseout h1': 'underlineIt',
        'mouseover h2': 'underlineIt',
        'mouseout h2': 'underlineIt',
        'click .hash-link': 'clickHashLink'
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
    }
});
