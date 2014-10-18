module.exports = function(app) {
	var applicationController = app.controllers.applicationController;

	// Routes do recurso 'Application'
	app.get('/api/:version/applications', applicationController.list);
	app.get('/api/:version/applications/:id', applicationController.show);
	app.post('/api/:version/applications', applicationController.create);
	app.put('/api/:version/applications/:id', applicationController.update);
	app.delete('/api/:version/applications/:id', applicationController.remove);
}