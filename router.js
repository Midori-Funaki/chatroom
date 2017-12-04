const //express = require('express'),
      passport = require('passport');
      //app = express(),
      //session = require('express-session'),
      //setupPassport = require('./passport'),
      //bodyParser = require('body-parser');

module.exports = (express) => {
    //Create router obj
    const router = express.Router();

    //Login middleware
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        //If false, redirect to login page
        res.redirect('/auth/facebook');
    }

    router.get('/',function(req,res){
        console.log('5. >> '+req.session);
        res.sendFile(__dirname + '/index.html');
    })    

    router.get('/chatroom',  isLoggedIn, (req, res) => {
        res.sendFile(__dirname+ '/chatroom.html');
    });

    router.post('/loginUser',(req,res)=>{
        let checkinUser = req.session.passport.user.profile.displayName;
        console.log('3b >> '+checkinUser);
        res.send(checkinUser);
    })

    router.get('/auth/facebook', passport.authenticate('facebook',{ 
        scope: ['user_friends', 'manage_pages'] 
    }));

    router.get('/auth/facebook/callback', passport.authenticate('facebook',{ 
        failureRedirect:'/error'
    }),(req,res)=>{
        res.redirect('/chatroom');
    });
    //Login error
    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    router.get('/logout',(req,res)=>{
        req.logout();
        res.redirect("/")
    });

    //Store message on reddis


    return router;
};