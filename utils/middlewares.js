var uuid = require('node-uuid')
var rest = require('../utils/restHelper');
var config = require('../config/config');
var auth = require('basic-auth');
var sha1 = require('sha1');

exports.versionFilter = function(req, res, next){
    res.contentType('application/json');
    var versions = config.versions.all;
    var version = req.url.split('/')[1];

    if(versions.indexOf(version) == -1){
        rest.badRequest(res, "Versão da API indisponível.");
    }else{
        next();
    }
}

exports.basicAuthFilter = function(req, res, next){
	if (!authenticate(req)) {
		rest.unauthorized(res, "Login e senha inválidos");
	} else {
		next();
	}
}

//Middleware com objetivo de logar input e marcar a requisição com um header
//Utilizado para fazer trace no log em caso de algum problema ocorra no cliente.
exports.logInput = function(req, res, next){
	var reqId = uuid.v1()
	res.setHeader('X-ReqId', reqId);
	console.log("Req ID: " + JSON.stringify(reqId));
	console.log("Query: " + JSON.stringify(req.query));
	console.log("Params: " + JSON.stringify(req.params));
	console.log("Request Body: " + JSON.stringify(req.body));
 	next()
}

function authenticate(req){
	var credentials = auth(req);
 	if(credentials){
	 	for(var index in config.users){
	 		var thisUser = config.users[index]
	 		if(thisUser.username == credentials.name && thisUser.pass == sha1(credentials.pass)){
	 			return thisUser;
	 		}
	 	}
	}
}