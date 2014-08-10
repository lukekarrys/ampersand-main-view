Function.prototype.bind = require('function-bind');
var test = require('tape');
var MainView = require('../ampersand-main-view');
var TestView = MainView.extend({
    router: require('../sample/client/router')
});


test('Assigns to global', function (t) {
    var app = {};

    new TestView({
        app: app
    });

    t.ok(typeof app.view === 'object');
    t.ok(typeof app.router === 'object');
    t.ok(typeof app.navigate === 'function');

    t.end();
});

test('Throws without a router', function (t) {
    t.throws(function () {
        new MainView();
    });

    t.end();
});