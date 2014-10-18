module.exports = function(app) {
	var appServerController = app.controllers.appServerController;

	//TODO: alterar para ter um filtro para validar se versão é valida
	app.get('/api/:version/appServers', appServerController.list);
	app.get('/api/:version/appServers/:id', appServerController.show);
	app.get('/api/:version/appServers/:id/applications', appServerController.applications);

	app.post('/api/:version/appServers', appServerController.create);
	app.put('/api/:version/appServers/:id', appServerController.update);
	app.delete('/api/:version/appServers/:id', appServerController.remove);
}