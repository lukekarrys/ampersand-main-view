ampersand-main-view
===================

A view providing helpers to initialize and manage the main view of your single-page app.


## Install

**This hasn't been published to npm yet. It will be after some
[decisions are made](https://github.com/lukekarrys/ampersand-main-view/issues).**


## What does it do?

Glad you asked! When you initialize an `ampersand-main-view` it will:

1. Create an `amperand-router` with the `router` options you pass in
2. Add a helper funciton to the router called `triggerPage`
3. Optionally add references to itself, `router` and `navigate` to a global object
4. Render itself
5. Initialize an `ampersand-view-switcher` for the `pageRegion`
6. Start the router

After all that is done, the newly created router will start the clientside routing
flow. You can call `this.triggerPage(PageConstructor)` from inside any router
function, and it will initialize that `PageConstructor` inside the `pageRegion`.

That's a high-level overviewg of what it does. Check out the API reference below
to see what each function does.

## API

### Options

```js
// Defaults
new MainView({
    pageEvent: 'newPage',
    pageRegion: '[role=page]',
    navRegion: '[role=navigation]'
    navActiveClass: 'active',
    router: {},
    app: null
})
```

#### `pageEvent` (String, default: `newPage`)

This is the event that will be trigged on the `router` when `router.triggerPage`
is called.

#### `pageRegion` (selector String or HTMLElement, default: `[role=page]`)

This is the element on the page where the view switcher will swap out pages.

#### `navRegion` (selector String or HTMLElement, default: `[role=navigation]`)

This is the element on the page with navigation links. Navigation links will be
toggled with the `navActiveClass` based on if their `pathname` matches the
current page's pathname.

#### `navActiveClass` (String, default: 'active')

This is a class name which will be added to active links in the `navRegion`.

#### `router` (Object, required)

This object will be passed directly to `Router.extend`.

#### `app` (Object, default: null)

If you have an application object you can pass it in and a few properties will
be attched to it as a convenience. `router` and `view` will be the created router
and the main view. The method `navigate(path)` will also be attached.



### Router Methods

#### `router.triggerPage(PageConstructor)`

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
            this.triggerPage(HomePage);
        },
        users: function () {
            this.triggerPage(UsersPage);
        }
    }
});
```



### View Methods

#### `render`
#### `initViewSwitcher`
#### `startRouter`
#### `updatePage`
#### `updateNav`
#### `updateNavLinks`
#### `handleLinkClick`
#### `handleHashLinkClick`
#### `navigate`