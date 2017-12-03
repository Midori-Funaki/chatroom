var sharedsession = require("express-socket.io-session");
var cookieParser = require("cookie-parser");

module.exports = (io, session) => {
    //Sharing session data
    // io.use(sharedsession(session,{
    //     autoSave: true
    // }));

    io.use(sharedsession(session, cookieParser()));

    io.on('connection',function(socket){
        let connections = [];
        let users = [];
        //Connect
        connections.push(socket);
        console.log("Connected: %s sockets connected " + connections.length)


        //Make session available from socket
        io.sockets.on('connection',(socket)=>{
            //connections.push(socket)
            socket.request.session
        })

        //Disconnect
        socket.on('disconnect',function(data){
            users.splice(users.indexOf(socket.username))
            connections.splice(connections.indexOf(socket.username),1);
            updateUsernames();
            console.log('Disconnected : %s sockets connected ' + connections.length);    
        });

        
        //Send message
        socket.on('send message',function(data){
            //autoSave: true;
            console.log('3a >> ' + data);
            io.sockets.emit('new message',{msg: data, user:socket.username});
        })

        //New User
        socket.on('new user', function(data,callback){
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateUsernames();
        })

        function updateUsernames(){
            io.sockets.emit('get users', setupPassport.logInUsers);
        }
    })
}