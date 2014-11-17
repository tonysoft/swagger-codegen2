exports.getUserByName = function(req, res, writeResponse, next) {
	responseMessage = {message: "UserApi_impl.getUserByName:'" + req.params.username + "'... Got some stuff from the DB and returned it..."};
	writeResponse(res, responseMessage, 200);
	next(responseMessage);
}