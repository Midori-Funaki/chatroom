const passport = require('passport'),
      FacebookStrategy = require('passport-facebook').Strategy,
      cookieParser = require('cookie-parser'),
      //redis = require('redis');
      //redisClient = redis.createClient();
      //RedisStore = require('connect-redis')(session),
      //redisStore = new RedisStore({client: redisClient}),
      sharedsession = require('express-socket.io-session');
      //sessionService = require('session-service'),
      //usersSocketRoute = require('users-socket');
        require('dotenv').config();

module.exports = (app, session)=>{
    let logInUsers = [];

    //Add session sharing middlewares
    //app.use(cookieParser(config.sessionSecret));
    /*app.use(express.session({
        //secret: 'supersecret'
        //resave: true,
        //saveUninitialized: true
    }));*/

    /*var sessionObj = require('express-session')({
        secret: "my-secret",
        resave: true,
        saveUninitialized: true
    })*/
    app.use(session);    
    //Connect express and passport
    app.use(passport.initialize());
    //Set up express session middleware
    app.use(passport.session());
    //Use express-session middleware for express
    //app.use(session);

    //Facebook login
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            logInUsers.push(profile.displayName);
            //console.log('1.d >> '+logInUsers);
            return cb(null,{profile:profile,accessToken:accessToken});
        }
    ));
    
    /*
    //Handshake
    ioServer.use((socket, next)=>{
        let parseCookie = cookieParser(config.sessionSecret);
        let handshake = socket.request;

        parseCookie(handshake, null, (err, data)=>{
            sessionService.get(handshake, (err, session)=>{
                if(err)
                    next(new Error(err.message));
                if(!session)
                    next(new Error("Not authorized"));
                handshake.session = session;
                next();
            })
        })
    })
    */

    /*
    //Initialize a socket module
    ioServer.sockets.on('connection',(socket)=>{
        usersSocketRoute(socket);
    })
    */

    //Keep track of users through express-session
    passport.serializeUser((user,done)=>{
        done(null,user);
    });

    passport.deserializeUser((user,done)=>{
        done(null,user);
    });

    //return session;
}