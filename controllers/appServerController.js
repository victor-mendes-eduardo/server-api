var validationHandler = require('../utils/validationHandler');
var rest = require('../utils/restHelper');

module.exports = function(app){

	return {
		// Exibe um Servidor dado um ID 
		show: function(req, res){
			var appServerService = getService('appServer', req.params.version);

			appServerService.show(req.params.id, function(appServer){
				if(appServer){
					res.json(appServer); 
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
				rest.ok(res, "Servidor criado com sucesso");
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

		// Retorna lista de aplicações de um Servidor
		applications: function(req, res){
			res.send('show');
		}
	}
}

function getService(serviceName, version){
	return require('../utils/serviceInjector').getService(serviceName, version);
}