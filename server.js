/*
 * Biblio NodeJS server.
 * 
 */

console.log('*** Biblio Serveur ***');

/* Dependencies. */
console.log('Loading dependencies...');
var http = require('http');
var fs = require('fs');

console.log('Creating server...');

/* HTTP handler. */
var httpHandler = function (req, res) {
    console.log('Handling request...');
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
};

var server = http.createServer(httpHandler);

/* Socket IO. */
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log('Client connected !');

    socket.emit('message', 'Tango zoulou client connected.');

    socket.on('message', function (message) {
        console.log('Receiving message : ' + message);
        socket.emit('message', 'Message received.');
    });
});

/* Start server. */
console.log('Starting listening...');
server.listen(8080);
console.log('Listening...');