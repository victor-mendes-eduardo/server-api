var rest = require('../utils/restHelper');
var config = require('../config/config');
var auth = require('basic-auth');
var sha1 = require('sha1');

exports.versionFilter = function(req, res, next){
    res.contentType('application/json');
    var versions = config.versions.all;
    var version = req.url.split('/')[2];

    if(versions.indexOf(version) == -1){
        rest.badRequest(res, "Dados inválidos");
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

function authenticate(req){
	var credentials = auth(req);
 	if(credentials){
	 	for(index in config.users){
	 		var thisUser = config.users[index]
	 		if(thisUser.username == credentials.name && thisUser.pass == sha1(credentials.pass)){
	 			return thisUser;
	 		}
	 	}
	}
}