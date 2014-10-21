module.exports = function(app) {
	var appServerController = app.controllers.appServerController;

	// Routes do recurso 'AppServer'
	app.get('/:version/appServers', appServerController.list);
	app.get('/:version/appServers/:id', appServerController.show);
	app.post('/:version/appServers', appServerController.create);
	app.put('/:version/appServers/:id', appServerController.update);
	app.delete('/:version/appServers/:id', appServerController.remove);

	// Routes do sub-recurso 'Application'
	app.get('/:version/appServers/:id/applications', appServerController.listApplications);
	app.post('/:version/appServers/:id/applications', appServerController.addApplication);
	app.delete('/:version/appServers/:id/applications/:appId', appServerController.removeApplication);
	app.post('/:version/appServers/:id/applications/:appId', appServerController.addExistingApplication);
}