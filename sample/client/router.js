var View = require('ampersand-view');
function PageWithTitle(title) {
    return View.extend({template: '<h2>' + title + '</h2>'});
}

module.exports = {
    routes: {
        '': 'index',
        'page1': 'page1',
        'page2': 'page2'
    },

    index: function () {
        this.triggerPage(PageWithTitle('Home'));
    },

    page1: function () {
        this.triggerPage(PageWithTitle('Page 1'));
    },

    page2: function () {
        this.triggerPage(PageWithTitle('Page 2'));
    }
};
