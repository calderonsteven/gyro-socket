//Require the express module and create a server
var express = require('express');
var app = express.createServer(express.logger());
var io = require('socket.io').listen(app);

//Serve the index.html page when the default route is called
app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

// assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

//chose de post
var port = process.env.PORT || 5000;

//After connecting
io.sockets.on('connection', function(socket){ 
    //Listen for an event called mobile_device_change
    socket.on('mobile_device_change', function(data){
  //Broadcast another event containing the data
  //received from the mobile_device_change event
        socket.broadcast.emit('update', data);
    });
});

app.listen(port, function() {
  console.log("Listening on " + port);
});