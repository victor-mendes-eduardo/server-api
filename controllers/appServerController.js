var validationHandler = require('../utils/validationHandler');
var rest = require('../utils/restHelper');

module.exports = function(app){

	return {
		// Exibe um Servidor dado um ID 
		show: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			appServerService.get(req.params.id, function(appServerModel){
				if(appServerModel){
					res.json(appServerModel.toJson()); 
				}else{
					rest.notFound(res, "Servidor não encontrado");
				}
			});
		},

		// Cria um novo Servidor
		create: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			var success = function(appServer){
				rest.created(res, "Servidor criado com sucesso", { name: 'appServer', id: appServer._id, version: req.params.version });
			}

			var error = function(appServer, errors){
				errors = validationHandler.buildErrorReport(errors);
				rest.badRequest(res, "Dados inválidos", errors);
			}

			appServerService.create(req.body, success, error);
		},

		// Atualiza um servidor
		update: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			var success = function(appServer){
				rest.ok(res, "Servidor atualizado com sucesso");
			}

			var error = function(appServer, errors){
				if(!appServer){
					rest.notFound(res, "Servidor não encontrado");
				}else{
					errors = validationHandler.buildErrorReport(errors);
					rest.badRequest(res, "Dados inválidos", errors);
				}
			}

			appServerService.update(req.params.id, req.body, success, error)
		},

		// Remove um servidor
		remove: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			appServerService.remove(req.params.id, function(error){
				if(error){
					rest.serverError(res, "Erro ao remover Servidor");
				}else{
					rest.ok(res, "Servidor removido com sucesso");
				}
			})
		},

		// Retorna lista de Servidores de aplicação
		list: function(req, res) {
			var appServerService = getService('appServer', req.params.version);
			appServerService.list(req.query, function(appServers){
				res.json(appServers); 
			});
		},

		listApplications: function(req, res){
			var appServerService = getService('appServer', req.params.version);
			appServerService.getAppServerApplications(req.params.id, function(applications){
				res.json(applications); 	
			});
		},

		addApplication: function(req, res){

		},

		removeApplication: function(req, res){

		}
	}
}

function getService(serviceName, version){
	return require('../utils/serviceInjector').getService(serviceName, version);
}