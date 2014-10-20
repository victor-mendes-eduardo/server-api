var AppServer = require('../models/appServer');
var Application = require('../models/application');

exports.get = function (id, callback){
	AppServer.findOne({ '_id':  id }, function (err, appServerModel) {
		callback(appServerModel);
	});
};

exports.create = function (reqBody, success, error){
	var appServerModel = new AppServer();
	appServerModel.updateProperties(reqBody);

	appServerModel.save(function(errors){
		if(!errors) {
			success(appServerModel);
		} else {
			error(appServerModel, errors);
		}
    });
};

exports.update = function (id, reqBody, success, error){
	AppServer.findById(id, function(errors, appServerModel) {
		if (errors){
			error(appServerModel, errors);
			return;
		}

		appServerModel.updateProperties(reqBody);

		appServerModel.save(function(errors) {
			if (!errors){
				success(appServerModel);
			}else{
				error(appServerModel, errors);
			}
		});
	});
};

exports.remove = function(id, callback){
	AppServer.remove({ _id: id }, function(err) { callback(err); });
}

/**
Efetua listagem dos Servidores com filtro pelos campos 'name', 'ipAddress', 'tags' e 'status'
*/
exports.list = function (params, callback){
	var max = params.max && !isNaN(params.max) ? (Math.min(parseInt(params.max), 100)) : 10;
	var offset = params.offset && !isNaN(params.offset) ? parseInt(params.offset) : 0;

	var query = AppServer.find().limit(max).skip(offset);
	query = buildQueryCriteria(query, params);

	query.exec( function(err, appServerModels) {
		var response = {}
		response.appServers = appServerModels.map(function(appServerModel){
			return appServerModel.toJson();
		});

		var query = AppServer.find();
		query = buildQueryCriteria(query, params)
		query.count(function(err,count){
			response.count = count;
			callback(response);
		});
	});
};

exports.getAppServerApplications = function(appServerId, callback){
	exports.get(appServerId, function(appServerModel){
		if(!appServerModel){
			callback([]);
		}else{
			callback(appServerModel.applications);
		}
	});
}

/**
Adiciona uma aplicação a um servidor, caso não exista cria uma nova e associa.
*/
//TODO: reavaliar adição de application se é melhor fazer por id ou name quando nao for criar novo
exports.addApplication = function(appServerId, reqBody, success, error){
	exports.get(appServerId, function(appServerModel){
		if(!appServerModel){
			error([]);
		}else{
			var appSaveSucces = function(applicationModel, created){
				appServerModel.addApplication(applicationModel);
				appServerModel.save();
				success(applicationModel, created);
			}

			var appSaveError = function(errors){
				error(appServerModel, errors);
			}

			var applicationService = require('./applicationServiceV1')

			//Busca Application por nome, caso não encontre salva uma nova
			applicationService.list({ name: reqBody.name }, function(applicationModels){
				if(applicationModels.count > 0){
					appSaveSucces(applicationModels.applications[0], false)
				}else{
					applicationService.create(reqBody, appSaveSucces, appSaveError);
				}	
			});
		}
	});
}

exports.addExistingApplication = function(appServerId, applicationId, success, error){
	exports.get(appServerId, function(appServerModel){
		if(!appServerModel){
			error(appServerModel, null);
		}else{
			var applicationService = require('./applicationServiceV1')

			applicationService.get(applicationId, function(applicationModel){
				if(applicationModel){
					appServerModel.addApplication(applicationModel);
					appServerModel.save();
					success(applicationModel);
				}else{
					error(appServerModel, applicationModel);
				}	
			});
		}
	});
}

/*
Remove uma aplicação de um servidor mas não de fato a remove do banco
*/
exports.removeApplication = function(appServerId, applicationId, success, error){
	exports.get(appServerId, function(appServerModel){
		if(!appServerModel){
			error([]);
		}else{
			appServerModel.removeApplication(applicationId);
			appServerModel.save();
			success();
		}
	});
}

function buildQueryCriteria(query, params){
	if(params.name){
		query.where('name').equals(params.name);
	}
	if(params.status){
		query.where('status').equals(params.status);
	}	
	if(params.ipAddress){
		query.where('ipAddress').equals(params.ipAddress);
	}
	if(params.tag){
		query.where('tags').equals(params.tag);
	}
	return query;
}