module.exports = function(app) {
	var appServerController = app.controllers.appServerController;

	// Routes do recurso 'AppServer'
	app.get('/api/:version/appServers', appServerController.list);
	app.get('/api/:version/appServers/:id', appServerController.show);
	app.post('/api/:version/appServers', appServerController.create);
	app.put('/api/:version/appServers/:id', appServerController.update);
	app.delete('/api/:version/appServers/:id', appServerController.remove);

	// Routes do sub-recurso 'Application'
	app.get('/api/:version/appServers/:id/applications', appServerController.listApplications);
	app.post('/api/:version/appServers/:id/applications', appServerController.addApplication);
	app.delete('/api/:version/appServers/:id/applications', appServerController.removeApplication);
}