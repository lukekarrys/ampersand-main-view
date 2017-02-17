var navLink = function (path, text, classes) {
  return ['<li>', '<a class="' + classes + '" href="' + path + '">', '<span>', text, '</span>', '</a>', '</li>'].join('')
}
var navLinks = function (arr) {
  return '<ul class="nav navbar-nav">' + arr.map(function (obj) {
    return navLink(obj[0], obj[1], obj[2] || '')
  }).join('') + '</ul>'
}
var navs = [
    ['/', 'Home'],
    ['/page1', 'Page 1'],
    ['/page2', 'Page 2'],
    ['#', 'Hash Link', 'hash-link'],
    ['#hask-link', 'Hash Link', 'hash-link'],
    ['#u-hask-link', 'Hash Link', 'unprevented-hash-link']
]

module.exports = navLinks(navs)
