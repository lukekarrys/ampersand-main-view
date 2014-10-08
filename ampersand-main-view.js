var dom = require('ampersand-dom');
var links = require('local-links');
var View = require('ampersand-view');
var BaseRouter = require('ampersand-router');
var ViewSwitcher = require('ampersand-view-switcher');

// Find an selector within an element
var findEl = function (el, selector) {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
};

// Lodash util methods
var defaults = require('lodash.defaults');
var extend = require('lodash.assign');
var pick = require('lodash.pick');
var bind = require('lodash.bind');
var each = require('lodash.foreach');
var result = require('lodash.result');

// Waiting for https://github.com/AmpersandJS/ampersand-view/pull/40
var BaseExtend = View.extend;
View.extend = function () {
    var child = BaseExtend.apply(this, arguments);
    var childProto = child.prototype;
    var parentProto = child.__super__;
    var propName = 'events';

    var parentDefs = result(parentProto, propName);
    var childDefs = result(childProto, propName);

    if (parentDefs && parentDefs === Object(parentDefs)) {
        each(parentDefs, function (parentDefValue, parentDefKey) {
            if (typeof childDefs[parentDefKey] === 'undefined') {
                childProto[propName][parentDefKey] = parentDefValue;
            }
        });
    }

    return child;
};


module.exports = View.extend({
    autoRender: true,

    events: {
        'click a[href]': 'handleLinkClick'
    },

    initialize: function (options) {
        options || (options = {});

        var defaultOptions = {
            pageEvent: 'newPage',
            pageRegion: '[data-hook="page"]',
            pageOptions: {},
            navRegion: '[data-hook="navigation"]',
            navItem: 'a',
            navActiveClass: 'active'
        };

        defaults(options, extend({}, defaultOptions, {
            router: null
        }));

        // Add all defaultOptions keys as props on this view instance
        extend(this, pick(options, Object.keys(defaultOptions)));

        var routerOptions = options.router || this.router || {};
        routerOptions.triggerPage = function (page) {
            this.trigger(options.pageEvent, page);
        };

        this.router = new (BaseRouter.extend(routerOptions))();
        this.listenTo(this.router, options.pageEvent, bind(this.updatePage, this));
    },

    render: function () {
        this.renderWithTemplate(this);

        if (!this.el.parentNode) {
            document.body.appendChild(this.el);
        }

        this.startViewSwitcher();
        this.startRouter();

        return this;
    },

    startViewSwitcher: function () {
        var pageRegion = this.query(this.pageRegion);
        this.pageSwitcher = new ViewSwitcher(pageRegion, this.pageOptions);
    },

    startRouter: function () {
        this.router.history.start({pushState: true});
    },

    updatePage: function (page) {
        this.pageSwitcher.set(page);
        this.currentPage = page;
        this.setActiveNavItems();
    },

    setActiveNavItems: function () {
        var navRegion = this.query(this.navRegion);
        if (navRegion && this.navItem) {
            findEl(navRegion, this.navItem).forEach(this.setActiveNavItem, this);
        }
    },

    setActiveNavItem: function (aTag) {
        if (!this.navActiveClass) return;
        if (this.isNavItemActive(aTag)) {
            dom.addClass(aTag, this.navActiveClass);
        } else {
            dom.removeClass(aTag, this.navActiveClass);
        }
    },

    isNavItemActive: function (aTag) {
        return links.active(aTag, this.router.history.fragment);
    },

    handleLinkClick: function (event) {
        var localPathname = links.pathname(event);
        if (localPathname) {
            event.preventDefault();
            this.navigate(localPathname);
        } else if (links.hash(event)) {
            this.handleHashLinkClick(event);
        }
    },

    // No-op
    handleHashLinkClick: function () {},

    navigate: function (path, options) {
        options || (options = {});
        defaults(options, { trigger: true });
        this.router.history.navigate(path, options);
    }
});
