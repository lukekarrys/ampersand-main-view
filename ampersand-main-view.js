var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var BaseRouter = require('ampersand-router');
var defaults = require('defaults');
var extend = require('lodash.assign');
var pick = require('lodash.pick');
var dom = require('ampersand-dom');


module.exports = View.extend({
    autoRender: true,

    events: {
        'click a[href]': 'handleLinkClick'
    },

    initialize: function (options) {
        options || (options = {});

        defaults(options, {
            pageEvent: 'newPage',
            pageRegion: '[role="page"]',
            navRegion: '[role="navigation"]',
            navActiveClass: 'active'
        });

        var viewOptions = pick(options, ['pageRegion', 'navRegion', 'navActiveClass']);
        extend(this, viewOptions);

        var Router = BaseRouter.extend(extend(this.router, {
            triggerPage: function (PageConstructor) {
                this.trigger(options.pageEvent, new PageConstructor());
            }
        }));

        this.router = new Router();
        this.listenTo(this.router, options.pageEvent, this.updatePage.bind(this));
    },

    render: function () {
        this.renderWithTemplate(this);
        this.initViewSwitcher();
        this.startRouter();

        if (!this.el.parentNode) {
            document.body.appendChild(this.el);
        }

        return this;
    },

    initViewSwitcher: function () {
        this.pageSwitcher = new ViewSwitcher(this.get(this.pageRegion));
    },

    startRouter: function () {
        this.router.history.start({pushState: true});
    },

    updatePage: function (page) {
        this.pageSwitcher.set(page);
        this.updateNav();
    },

    updateNav: function () {
        this.getAll(this.navRegion + ' a').forEach(this.updateNavLinks, this);
    },

    updateNavLinks: function (aTag) {
        if (window.location.pathname === aTag.pathname) {
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

        if (aTag.host === window.location.host) {
            e.preventDefault();
            this.router.history.navigate(aTag.pathname, {trigger: true});
        }
    }
});
