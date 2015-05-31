const db = require('./db.js');

module.exports = function (server) {
	const io = require('socket.io').listen(server);


	io.on('connection', function(socket) {
	    console.log("YOLOOOOOOO");


	    socket.on('post_message', function(msg) {
	        console.log("New Message", msg);

	        db.saveMessage(msg, function (err, success) {
	        	if (err || !success)
	        		throw err;
	        	else
	        		//socket.broadcast.emit('new_message', msg);
	        	console.log("YAYYYYYY");
	        })
	    })
	})

	return io;
}