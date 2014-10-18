// Status são retornados via HTTP Status e também no corpo para clientes que possuam limitação tecnológica
var statusCodes = { OK: 200, CREATED: 201, BAD_REQUEST: 400, UNAUTHORIZED: 401, NOT_FOUND: 404, SERVER_ERROR: 500 }

exports.notFound = function(res, message){
	res.statusCode = statusCodes.NOT_FOUND;
	res.send({ status: res.statusCode, message: message });
}

exports.badRequest = function(res, message, errors){
	res.statusCode = statusCodes.BAD_REQUEST;
	var responseMessage = { status: res.statusCode, message: message, errors: errors };
	if(errors != null){
		responseMessage.errors = errors;
	}
	res.send(responseMessage);
}

exports.ok  = function(res, message){
	res.statusCode = statusCodes.OK;
	res.send({ status: res.statusCode, message: message });
}

exports.created = function(res, message, resource){
	res.location('/api/'+ resource.version + '/'+ resource.name +'s/' + resource.id);
	res.statusCode = statusCodes.CREATED;
	res.send({ status: res.statusCode, message: message, id: resource.id });
}

exports.unauthorized = function(res, message){
	res.statusCode = statusCodes.UNAUTHORIZED;
	res.setHeader('WWW-Authenticate', 'Basic realm="server-api"');
	res.send({ status: res.statusCode, message: message });
}

exports.serverError = function(res, message){
	res.statusCode = statusCodes.SERVER_ERROR;
	res.send({ status: res.statusCode, message: message });
}