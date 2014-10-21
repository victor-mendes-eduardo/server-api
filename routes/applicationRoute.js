module.exports = function(app) {
	var applicationController = app.controllers.applicationController;

	// Routes do recurso 'Application'
	app.get('/:version/applications', applicationController.list);
	app.get('/:version/applications/:id', applicationController.show);
	app.post('/:version/applications', applicationController.create);
	app.put('/:version/applications/:id', applicationController.update);
	app.delete('/:version/applications/:id', applicationController.remove);
}