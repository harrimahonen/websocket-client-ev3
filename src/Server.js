// server.js
const WebSocket = require('ws');
var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var ws = new Server({port: port});

ws.on('connection', function(w){
  
  w.on('message', function(msg){
    console.log('message from client');
  });
  
  w.on('close', function() {
    console.log('closing connection');
  });

});


var connection = new WebSocket('ws://localhost:8887');

connection.onopen = function () {
    var data = {
    to: "sec-websocket-identifier",
    message: 'hello from client 1'
};
connection.send(JSON.stringify(data));
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {

};

