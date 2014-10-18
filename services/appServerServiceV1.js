var AppServer = require('../models/appServer')

exports.show = function (id, callback){
	AppServer.findOne({ '_id':  id }, function (err, appServerModel) {
		var appServer
		if(appServerModel){
			appServer = appServerModel.toJson()
		}

		callback(appServer);
	})
};

// TODO: paginar
// TODO: filtrar e buscar
exports.list = function (callback){
	AppServer.find(function(err, appServerModels) {
		var serverList = appServerModels.map(function(appServerModel){
			return appServerModel.toJson()
		});

		callback(serverList)
	})
};

exports.create = function (reqBody, success, error){
	var appServerModel = new AppServer()
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
	AppServer.remove({ _id: id }, function(err) {
		callback(err)
	});
}