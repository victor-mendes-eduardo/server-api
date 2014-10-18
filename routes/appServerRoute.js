module.exports = function(app) {
	var appServerController = app.controllers.appServerController;

	app.get('/api/:version/appServers', appServerController.list);
	app.get('/api/:version/appServers/:id', appServerController.show);
	app.get('/api/:version/appServers/:id/applications', appServerController.applications);

	app.post('/api/:version/appServers', appServerController.create);
	app.put('/api/:version/appServers/:id', appServerController.update);
	app.delete('/api/:version/appServers/:id', appServerController.remove);
}