module.exports.checkMessage = function (msg) {
	if (msg.author == null || msg.body == null)
		throw new Error('message must have non null body and author');

	return true;
}