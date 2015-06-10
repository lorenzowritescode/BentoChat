const db = require('./db.js'),
	  socketioJwt = require('socketio-jwt');

module.exports = function (server) {
	const io = require('socket.io').listen(server);


	io.on('connection', socketioJwt.authorize({
		secret: require('./util.js').secret,
		timeout: 15000
	})).on('authenticated', function(socket) {	    
	    socket.on('post_message', function(msg) {
	        db.saveMessage(msg, function (err, key) {
	        	if (err || !key)
	        		throw err;
	        	
	        	msg.id = key;
	        	io.emit('new_message', msg);
	        })
	    });

	    socket.on('i_am_online', function () {
	    	var username = socket.decoded_token.username,
	    		group_name = 'test-group';

	    	io.emit('user_online', {username, group_name});
	    })
	});

	return io;
}