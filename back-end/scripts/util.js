'use strict';
const bcrypt = require('bcrypt');

function checkMessage (msg) {
	if (msg.author == null || msg.body == null)
		throw new Error('message must have non null body and author');

	return true;
}

function passwordHash (password) {
	return bcrypt.hashSync(password, 8);
}

function User (fullName, email, username, password) {
	if (!!fullName && !!email && !!username && !!password) {
		var hash = passwordHash(password);
		return {
			fullName, email, username, hash
		}
	} else {
		throw new Error('the account details were missing')
	}
}

function makeUser (reqBody) {
	return new User(reqBody.fullName, reqBody.email, reqBody.username, reqBody.password);
}

function makeWikiPost (reqBody, userDetails) {
	return {
		author: userDetails.username || '',
		title: reqBody.title || '',
		timestamp: reqBody.timestamp ||  Date.now(),
		body: reqBody.body || ''
	}
}

function makeComment (reqBody, userDetails) {
	return {
		author: userDetails.username || '',
		body: reqBody.body || '',
		postid: reqBody.postid || '',
		timestamp: reqBody.timestamp || Date.now()
	}
}

module.exports = {
	makeUser: makeUser,
	User: User,
	checkMessage: checkMessage,
	secret: 'bento-secret-deeznuts',
	makeWikiPost: makeWikiPost,
	makeComment: makeComment
}