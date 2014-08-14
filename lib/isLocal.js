function normalizeLeadingSlash(pathname) {
    if (pathname.charAt(0) !== '/') {
        pathname = '/' + pathname;
    }
    return pathname;
}

// [1] http://blogs.msdn.com/b/ieinternals/archive/2011/02/28/internet-explorer-window-location-pathname-missing-slash-and-host-has-port.aspx
// [2] https://github.com/substack/catch-links/blob/7aee219cdc2c845c78caad6070886a9380b90e4c/index.js#L13-L17
function isLocal(event, anchor, lookForHash) {
    event || (event = {});

    // Skip modifier events
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return null;
    }

    // IE9 doesn't put a leading slash on anchor.pathname [1]
    var aPathname = normalizeLeadingSlash(anchor.pathname);
    var wPathname = normalizeLeadingSlash(window.location.pathname);
    var aHost = anchor.host;
    var wHost = window.location.host;

    // Some browsers return an empty string for anchor.hash
    // even when href="#", so we also check the href
    var aHash = anchor.hash || (anchor.href.indexOf('#') > -1 ? '#' + anchor.href.split('#')[1] : null);
    var inPageHash;

    // Window has no port, but anchor does
    if (!window.location.port && anchor.port) {
        // IE9 sometimes includes the default port on anchor.host
        // so we append the default port to the window host in this case
        // so they will match for the host equality check [1]
        wHost += ':80';
    }

    // Hosts are the same, its a local link
    if (aHost === wHost) {

        // If everything else is the same
        // and hash exists, then it is an in-page hash
        inPageHash =
            aPathname === wPathname &&
            anchor.search === window.location.search &&
            aHash;

        if (lookForHash) {
            // If we are looking for the hash then this will
            // only return a truthy value if the link
            // is an *in-page* hash link
            return inPageHash;
        } else {
            // If this is an in page hash link
            // then ignore it because we werent looking for hash links
            return inPageHash ? null : aPathname;
        }
    }

    return null;
}

function isHTMLElement(obj) {
    return (typeof obj === 'object') &&
      (obj.nodeType === 1) && (typeof obj.style === 'object') &&
      (typeof obj.ownerDocument ==='object');
}

function getEventAndAnchor() {
    var args = Array.prototype.slice.call(arguments);
    var obj = {
        event: null,
        anchor: null
    };

    args.forEach(function (arg) {
        if (isHTMLElement(arg)) {
            obj.anchor = arg;
        } else {
            obj.event = arg;
        }
    });

    if (!obj.anchor && obj.event && isHTMLElement(obj.event.currentTarget)) {
        obj.anchor = obj.event.currentTarget;
    }

    return [obj.event, obj.anchor];
}

module.exports = {
    pathname: function () {
        return isLocal.apply(null, getEventAndAnchor.apply(null, arguments));
    },
    hash: function () {
        return isLocal.apply(null, getEventAndAnchor.apply(null, arguments).concat(true));
    },
    isCurrentPage: function () {
        return this.pathname.apply(null, arguments) === normalizeLeadingSlash(window.location.pathname);
    }
};
