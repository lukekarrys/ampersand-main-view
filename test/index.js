var test = require('tape');
var MainView = require('../sample/client/main');


test('Assigns to global', function (t) {
    var app = {};

    app.view = new MainView();

    t.ok(typeof app.view === 'object');
    t.ok(typeof app.view.router === 'object');
    t.ok(typeof app.view.navigate === 'function');

    t.end();
});
