var View = require('ampersand-view')
function PageWithTitle (title) {
  return View.extend({
    template: '<div><h2>' + title + '</h2><a href="#test", id="test-link">Test hash link</a></div>',
    events: {
      'click #test-link': 'testLink'
    },
    testLink: function (event) {
      event.preventDefault()
      var div = document.createElement('div')
      div.innerHTML = 'link clicked'
      this.el.appendChild(div)
    }
  })
}

module.exports = {
  routes: {
    '*path': 'page'
  },

  page: function (name) {
    this.triggerPage(new (PageWithTitle(name === null ? 'home' : name))())
  }
}
