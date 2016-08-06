var test = require('tape');
var extend = require('lodash/assign');
var routerOptions = require('../sample/client/router');
var AmpRouter = require('ampersand-router');
var MainView = require('../ampersand-main-view');


test('Properties get assigned', function (t) {
    t.plan(10);

    var app = {};

    app.view = new MainView();

    t.ok(typeof app.view === 'object');
    t.ok(typeof app.view.router === 'object');
    t.ok(typeof app.view.router.triggerPage === 'function');

    t.equal(app.view.pageEvent, 'newPage');
    t.equal(app.view.pageRegion, '[data-hook="page"]');
    t.equal(typeof app.view.pageOptions, 'object');
    t.equal(Object.keys(app.view.pageOptions).length, 0);
    t.equal(app.view.navRegion, '[data-hook="navigation"]');
    t.equal(app.view.navItem, 'a');
    t.equal(app.view.navActiveClass, 'active');

    t.end();
});

test('Properties can be changed', function (t) {
    t.plan(10);

    var app = {};

    app.view = new MainView({
        pageEvent: 'my-new-page',
        pageRegion: 'main',
        pageOptions: {test: 1},
        navRegion: 'nav',
        navItem: '.link',
        navActiveClass: 'active-link',
        router: {
            routerMethod: function () {}
        }
    });

    t.equal(app.view.pageEvent, 'my-new-page');
    t.equal(app.view.pageRegion, 'main');
    t.equal(typeof app.view.pageOptions, 'object');
    t.equal(Object.keys(app.view.pageOptions).length, 1);
    t.equal(app.view.pageOptions.test, 1);
    t.equal(app.view.navRegion, 'nav');
    t.equal(app.view.navItem, '.link');
    t.equal(app.view.navActiveClass, 'active-link');
    t.equal(typeof app.view.router.triggerPage, 'function');
    t.equal(typeof app.view.router.routerMethod, 'function');

    t.end();
});

test('Properties can be changed through extend', function (t) {
    t.plan(10);

    var app = {};
    var ExtendedMainView = MainView.extend({
        pageEvent: 'my-new-page',
        pageRegion: 'main',
        pageOptions: {test: 1},
        navRegion: 'nav',
        navItem: '.link',
        navActiveClass: 'active-link',
        router: {
            routerMethod: function () {}
        }
    });

    app.view = new ExtendedMainView();

    t.equal(app.view.pageEvent, 'my-new-page');
    t.equal(app.view.pageRegion, 'main');
    t.equal(typeof app.view.pageOptions, 'object');
    t.equal(Object.keys(app.view.pageOptions).length, 1);
    t.equal(app.view.pageOptions.test, 1);
    t.equal(app.view.navRegion, 'nav');
    t.equal(app.view.navItem, '.link');
    t.equal(app.view.navActiveClass, 'active-link');
    t.equal(typeof app.view.router.triggerPage, 'function');
    t.equal(typeof app.view.router.routerMethod, 'function');

    t.end();
});

test('Works with an already initialized router', function (t) {
    t.plan(4);

    var app = {};
    var _routerOptions = extend({}, routerOptions);
    _routerOptions.triggerPage2 = function () {};
    var Router = AmpRouter.extend(_routerOptions);

    app.view = new MainView({
        router: new Router()
    });

    t.ok(typeof app.view === 'object');
    t.ok(typeof app.view.router === 'object');
    t.ok(typeof app.view.router.triggerPage === 'function');
    t.ok(typeof app.view.router.triggerPage2 === 'function');

    t.end();
});
