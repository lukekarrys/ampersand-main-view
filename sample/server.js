var Hapi = require('hapi');

var app_config = {
    appPath: '/{clientPath*}',
    moonboots: {
        main: __dirname + '/client/app.js',
        developmentMode: true,
        stylesheets: [__dirname + '/public/app.css']
    }
};


var server = new Hapi.Server('0.0.0.0', 3001);
server.pack.register([{
    plugin: require('moonboots_hapi'),
    options: app_config
}], function startServer(err) {
    if (err) {
        throw err;
    }
    server.start(function serverStarted(err) {
        if (err) {
            throw err;
        }
        console.log('App started on localhost:3001');
    });
});
