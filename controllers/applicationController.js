var validationHandler = require('../utils/validationHandler');
var rest = require('../utils/restHelper');

module.exports = function(app){

	return {
		// Exibe uma Aplicação dado um ID 
		show: function(req, res){
			var applicationService = getService('application', req.params.version);

			applicationService.get(req.params.id, function(applicationModel){
				if(applicationModel){
					res.json(applicationModel.toJson()); 
				}else{
					rest.notFound(res, "Aplicação não encontrada");
				}
			});
		},

		// Cria uma nova Aplicação
		create: function(req, res){
			var applicationService = getService('application', req.params.version);

			var success = function(application){
				rest.created(res, "Aplicação criada com sucesso", { name: 'application', id: application._id, version: req.params.version });
			}

			var error = function(application, errors){
				errors = validationHandler.buildErrorReport(errors);
				rest.badRequest(res, "Dados inválidos", errors);
			}

			applicationService.create(req.body, success, error);
		},

		// Atualiza uma aplicação
		update: function(req, res){
			var applicationService = getService('application', req.params.version);

			var success = function(application){
				rest.ok(res, "Aplicação atualizada com sucesso");
			}

			var error = function(application, errors){
				if(!application){
					rest.notFound(res, "Aplicação não encontrada");
				}else{
					errors = validationHandler.buildErrorReport(errors);
					rest.badRequest(res, "Dados inválidos", errors);
				}
			}

			applicationService.update(req.params.id, req.body, success, error)
		},

		// Remove uma aplicação
		remove: function(req, res){
			var applicationService = getService('application', req.params.version);

			applicationService.remove(req.params.id, function(error){
				if(error){
					rest.serverError(res, "Erro ao remover Aplicação");
				}else{
					rest.ok(res, "Aplicação removida com sucesso");
				}
			})
		},

		// Retorna lista de Aplicaçãoes
		list: function(req, res) {
			var applicationService = getService('application', req.params.version);
			applicationService.list(req.query, function(applications){
				res.json(applications); 
			});
		},
	}
}

function getService(serviceName, version){
	return require('../utils/serviceInjector').getService(serviceName, version);
}