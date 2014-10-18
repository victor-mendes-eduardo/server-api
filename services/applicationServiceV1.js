var Application = require('../models/application');

exports.get = function (id, callback){
	Application.findOne({ '_id':  id }, function (err, applicationModel) {
		callback(applicationModel);
	});
};

exports.create = function (reqBody, success, error){
	var applicationModel = new Application();
	console.log(applicationModel)
	applicationModel.updateProperties(reqBody);

	applicationModel.save(function(errors){
		if(!errors) {
			success(applicationModel);
		} else {
			error(applicationModel, errors);
		}
    });
};

exports.update = function (id, reqBody, success, error){
	Application.findById(id, function(errors, applicationModel) {
		if (errors){
			error(applicationModel, errors);
			return;
		}

		applicationModel.updateProperties(reqBody);

		applicationModel.save(function(errors) {
			if (!errors){
				success(applicationModel);
			}else{
				error(applicationModel, errors);
			}
		});
	});
};

exports.remove = function(id, callback){
	//TODO: atualizar AppServers que utilizem essa Aplicação
	Application.remove({ _id: id }, function(err) { callback(err); });
}


/**
Efetua listagem dos Applicações com filtro pelos campos 'name', 'url'
*/
exports.list = function (params, callback){
	var max = params.max && !isNaN(params.max) ? (Math.min(parseInt(params.max), 100)) : 10;
	var offset = params.offset && !isNaN(params.offset) ? parseInt(params.offset) : 0;

	var query = Application.find().limit(max).skip(offset);
	query = buildQueryCriteria(query, params);

	query.exec( function(err, applicationModels) {
		var response = {}
		response.applications = applicationModels.map(function(applicationModel){
			return applicationModel.toJson();
		});

		var query = Application.find();
		query = buildQueryCriteria(query, params)
		query.count(function(err,count){
			response.count = count;
			callback(response);
		});
	});
};

function buildQueryCriteria(query, params){
	if(params.name){
		query.where('name').equals(params.name);
	}
	if(params.url){
		query.where('url').equals(params.url);
	}	
	return query;
}