const express = require('express'), // http: protocol//
      app = express(),

      session = require('express-session')({
            secret: "my-secret",
            resave: true,
            saveUninitialized: true
            }),
      //session = require('express-session'),
      bodyParser = require('body-parser'),
      passport = require('./passport')(app, session),
      server = require('http').createServer(app), // http: protocol//

      io = require('socket.io')(server); // ws: protocol//
      router = require('./router')(express),
      //redis = require('./redis')(),
      setupPassport = require('./passport'),
      socket = require('./socketio')(io, session),
      ioServer = io.listen(server);

  
app.use(bodyParser());
app.use("/", router);
server.listen(process.env.PORT || 8080);
console.log('Server running on 8080....');
