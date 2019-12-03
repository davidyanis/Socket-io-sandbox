var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    socket.broadcast.emit('connected user');
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
        socket.broadcast.emit('disconnect user');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('typing', function(typing){
        console.log('skriver: ' + typing);
        io.emit('typing', typing);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});