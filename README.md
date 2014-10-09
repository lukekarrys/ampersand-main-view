ampersand-main-view
===================

[![Build Status](https://travis-ci.org/lukekarrys/ampersand-main-view.png?branch=master)](https://travis-ci.org/lukekarrys/ampersand-main-view)

A view providing helpers to initialize and manage the main view of your single-page app.


## Install

**This hasn't been published to npm yet. It will be after some
[issues are closes](https://github.com/lukekarrys/ampersand-main-view/issues).**


## Why

There is a fair amount that happens every time I start up a new [`ampersandjs`](http://ampersandjs.com/)
project. This aims to be a starting point for a basic main view that you would have in your app.
It handles link clicks, navigation, intial rendering to the body, routing, page switching,
and navigation link activating.


## What does it do?

Glad you asked! When you initialize an `ampersand-main-view` it will:

1. Create an `amperand-router` with the `router` options you pass in
2. Add a helper funciton to the router called `triggerPage`
3. Render itself
5. Initialize an [`ampersand-view-switcher`](https://www.npmjs.org/package/ampersand-view-switcher) for the `pageRegion`
6. Start the router

After all that is done, the newly created router will start the clientside routing
flow. You can call `this.triggerPage(pageInstance)` from inside any router
function, and it will initialize that `pageInstance` inside the `pageRegion`.

That's a high-level overviewg of what it does. Check out the API reference below
to see what each function does.



## API

### Options

```js
// Defaults
new MainView({
    pageEvent: 'newPage',
    pageRegion: '[data-hook="page"]',
    pageOptions: {},
    navRegion: '[data-hook="navigation"]',
    navItem: 'a',
    navActiveClass: 'active',
    router: {}
});
```

#### `pageEvent` (String, default: `newPage`)

This is the event that will be trigged on the `router` when `router.triggerPage`
is called. You shouldn't have to change this unless it is conficting with an
already existing event on the views in your app.

#### `pageRegion` (selector String or HTMLElement, default: `[data-hook=page]`)

This is the element on the page where the view switcher will swap out pages.

#### `pageOptions` (Object, default: `{}`)

These options will be passed as the second argument to the view switcher. Check
out the [`ampersand-view-switcher` API](https://github.com/ampersandjs/ampersand-view-switcher#api-reference)
for more reference.

#### `navRegion` (selector String or HTMLElement, default: `[data-hook=navigation]`)

This is the element on the page with `navItem`s. `navItem`s will be
toggled with the `navActiveClass` based on if their `pathname` matches the
current page's pathname. Set to a falsy value to cancel all nav updating.

#### `navItem` (selector String, default: `a`)

This is the selector that will be used to find all the navigation links within
the `navRegion`.  Set to a falsy value to cancel all nav updating.

#### `navActiveClass` (String, default: 'active')

This is a class name which will be added to `navItem`s in the `navRegion`.
 Set to a falsy value to cancel all nav updating.

#### `router` (Object or Router, default: `{}`)

This object will be passed directly to `Router.extend` and then initialized. If
you pass in a Router, it won't be initiliazed again. 



### Router Methods

#### `router.triggerPage(pageInstance)`

This method can be called on the router to make a new page. This allows you to do
something like this in the `router` options that you pass to the main view:

```js
new MainView({
    router: {
        routes: {
            '': 'index',
            'users': 'users'
        },
        index: function () {
            this.triggerPage(new HomePage());
        },
        users: function () {
            this.triggerPage(new UsersPage());
        }
    }
});
```



### View Methods

The main idea behind `ampersand-main-view` is to have some sane defaults for the
main view of your app. All the methods below can be overridden with `extend` should
you need more flexibility.

#### Initialization Methods
##### `startViewSwitcher`
##### `startRouter`

#### Page Handling Methods
##### `updatePage`

#### Navigation Methods
##### `updateNav`
##### `setActiveNavItems`
##### `setActiveNavItem`
##### `isNavItemActive`

#### Route Handling Methods
##### `handleLinkClick`
##### `handleHashLinkClick`
##### `navigate`