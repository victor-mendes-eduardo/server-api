var validationHandler = require('../utils/validationHandler');

//TODO: refatorar respostas para remover duplicação
module.exports = function(app){

	return {

		// Retorna lista de Servidores de aplicação
		list: function(req, res) {
			var appServerService = getService('appServer', req.params.version);

			appServerService.list(function(appServers){
				res.json(appServers); 
			});
		},

		// Exibe um Servidor dado um ID 
		show: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			appServerService.show(req.params.id, function(appServer){
				if(appServer){
					res.json(appServer); 
				}else{
					res.statusCode = 404;
					res.send({ status: res.statusCode, message:"Servidor não encontrado" });
				}
			});
		},

		// Cria um novo Servidor
		create: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			var success = function(appServer){
				res.location('/api/'+req.params.version + '/appServer/' + appServer._id);
				res.statusCode = 201;
				res.send({ status: res.statusCode, message:"Servidor criado com sucesso", id: appServer.id });
			}

			var error = function(appServer, errors){
				res.statusCode = 400;
				var errors = validationHandler.buildErrorReport(errors);
				var errorReport = { status: res.statusCode, message:"Dados inválidos", errors: errors };
				res.send(errorReport);
			}

			appServerService.create(req.body, success, error)
		},

		// Atualiza um servidor
		update: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			var success = function(appServer){
				res.send({ status: res.statusCode, message:"Servidor atualizado com sucesso", id: appServer.id });
			}

			var error = function(appServer, errors){
				if(!appServer){
					res.statusCode = 404;
					res.send({ status: res.statusCode, message: "Servidor não encontrado" });
				}else{
					res.statusCode = 400;
					var errors = validationHandler.buildErrorReport(errors);
					var errorReport = { status: res.statusCode, message:"Dados inválidos", errors: errors };
					res.send(errorReport);
				}
			}

			appServerService.update(req.params.id, req.body, success, error)
		},

		// Remove um servidor
		remove: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			appServerService.remove(req.params.id, function(error){
				if(error){
					res.statusCode = 500;
					res.send({ status: res.statusCode, message: "Erro ao remover Servidor" });
				}else{
					res.send({ status: 200, message: "Servidor removido com sucesso." });
				}
			})
		},

		// Retorna lista de aplicações de um Servidor
		applications: function(req, res){
			res.send('show');
		},
	}
}

function getService(serviceName, version){
	return require('../utils/serviceInjector').getService(serviceName, version);
}