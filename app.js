var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	port = 3000,
	io = require('socket.io').listen(server);

server.listen(port);
console.log('listen port = ' + port);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
	socket.on('send message', function(data){
		io.sockets.emit('new message', { msg: data});
	});

	socket.on('disconnect', function(data){
		if (!socket.nickname) return;
		io.sockets.emit('lose connection', {msg:data});
	});
});

