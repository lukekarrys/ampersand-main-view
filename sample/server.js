var Hapi = require('hapi')
var MoonbootsHapi = require('moonboots_hapi')
var path = require('path')

var config = {
  appPath: '/{clientPath*}',
  moonboots: {
    main: path.join(__dirname, 'client', 'app.js'),
    developmentMode: true,
    stylesheets: [path.join(__dirname, 'public', 'app.css')]
  }
}

var server = new Hapi.Server()
server.connection({ host: 'localhost', port: 3001 })

server.register({
  register: MoonbootsHapi,
  options: config
}, server.start(function serverStarted (err) {
  if (err) {
    throw err
  }
  console.log('App started on localhost:3001')
}))
