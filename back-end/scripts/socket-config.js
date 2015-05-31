const db = require('./db.js');

module.exports = function (server) {
	const io = require('socket.io').listen(server);


	io.on('connection', function(socket) {

	    socket.on('post_message', function(msg) {
	        db.saveMessage(msg, function (err, success) {
	        	if (err || !success)
	        		throw err;
	        	
	        	msg.id = success['generated_keys'][0];
	        	io.emit('new_message', msg);
	        })
	    })
	})

	return io;
}