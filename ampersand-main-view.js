var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var BaseRouter = require('ampersand-router');
var dom = require('ampersand-dom');
var slice = Array.prototype.slice;


// A defaults method that doesnt clone anything
function defaults(options, _defaults) {
  options = options || {};
  Object.keys(_defaults).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = _defaults[key];
    }
  });
  return options;
}


module.exports = View.extend({
    autoRender: true,

    events: {
        'click a[href^="#"]': 'handleHashLinkClick',
        'click a[href]': 'handleLinkClick'
    },

    initialize: function (options) {
        options || (options = {});

        defaults(options, {
            pageEvent: 'newPage',
            pageRegion: '[role="page"]',
            navRegion: '[role="navigation"]',
            navActiveClass: 'active',
            app: null,
            router: null
        });

        ['pageRegion', 'navRegion', 'navActiveClass'].forEach(function (key) {
            this[key] = options[key];
        }, this);

        var routerOptions = options.router || this.router;
        var Router;

        if (routerOptions && routerOptions == Object(routerOptions)) {
            routerOptions.triggerPage = function (PageConstructor) {
                this.trigger(options.pageEvent, new PageConstructor());
            };

            Router = BaseRouter.extend(routerOptions);

            this.router = new Router();
            this.listenTo(this.router, options.pageEvent, this.updatePage.bind(this));
        } else {
            throw new Error('ampersand-main-view requires a router');
        }

        if (options.app && options.app === Object(options.app)) {
            options.app.view = this;
            options.app.router = this.router;
            options.app.navigate = this.navigate.bind(this);
        }
    },

    render: function () {
        this.renderWithTemplate(this);

        if (!this.el.parentNode) {
            document.body.appendChild(this.el);
        }

        this.initViewSwitcher();
        this.startRouter();

        return this;
    },

    initViewSwitcher: function () {
        var pageRegion = typeof this.pageRegion === 'string' ?
            this.get(this.pageRegion) : this.pageRegion;
        this.pageSwitcher = new ViewSwitcher(pageRegion);
    },

    startRouter: function () {
        this.router.history.start({pushState: true});
    },

    updatePage: function (page) {
        this.pageSwitcher.set(page);
        this.currentPage = page;
        this.updateNav();
    },

    updateNav: function () {
        var navRegion = typeof this.navRegion === 'string' ?
            this.get(this.navRegion) : this.navRegion;
        if (navRegion) {
            slice.call(navRegion.querySelectorAll('a'))
                .forEach(this.updateNavLinks, this);
        }
    },

    updateNavLinks: function (aTag) {
        var samePage = aTag.pathname === window.location.pathname;
        var isHashOnly = samePage && aTag.hash !== '' && aTag.hash.length > 1;

        if (samePage && !isHashOnly) {
            dom.addClass(aTag, this.navActiveClass);
        } else {
            dom.removeClass(aTag, this.navActiveClass);
        }
    },

    handleLinkClick: function (e) {
        if (e.metaKey || e.ctrlKey) {
            return;
        }

        var aTag = e.target;
        var isLocal = aTag.host === window.location.host;

        if (isLocal) {
            e.preventDefault();
            this.navigate(aTag.pathname);
        }
    },

    handleHashLinkClick: function (e) {
        if (e.metaKey || e.ctrlKey) {
            return;
        }

        // TODO: decide what to do with hash links
        // Currently this will add the hash to the url
        // but it wont bubble up to `handleLinkClick`
        e.stopImmediatePropagation();
    },

    navigate: function (path, options) {
        options || (options = {});
        defaults(options, {
            trigger: true
        });
        this.router.history.navigate(path, options);
    }
});
