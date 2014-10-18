var AppServer = require('../models/appServer')

exports.show = function (id, callback){
	AppServer.findOne({ '_id':  id }, function (err, appServerModel) {
		var appServer;
		if(appServerModel){
			appServer = appServerModel.toJson();
		}

		callback(appServer);
	})
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
		})
	})
};

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