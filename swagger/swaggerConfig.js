var swagger = require("swagger-node-express");
var cors = cors = require("cors");
var express = require('express');

exports.configure = function(app, express){
	var corsOptions = {
		credentials: true,
		origin: function(origin,callback) {
			if(origin===undefined) {
				callback(null,false);
			} else {
				// change wordnik.com to your allowed domain.
				var match = origin.match("^(.*)?.wordnik.com(\:[0-9]+)?");
				var allowed = (match!==null && match.length > 0);
				callback(null,allowed);
			}
		}
	};

	var subpath = express();
	app.use("/docs", subpath);

	swagger.setAppHandler(subpath);

	var models = require("./models.js");
	var resources = require("./resources.js");

	swagger.addModels(models)
	.addPost(resources.createAppServer)
	.addPut(resources.updateAppServer)
	.addGet(resources.getAppServer)
	.addGet(resources.listAppServer)
	.addDelete(resources.removeAppServer)	
	.addGet(resources.getServerApplications)	
	.addPost(resources.addApplicationToServer)	
	.addPost(resources.associateApplicationToServer)	
	.addDelete(resources.removeApplicationFromServer)	
	.addPost(resources.createApplication)
	.addPut(resources.updateApplication)
	.addGet(resources.getApplication)
	.addGet(resources.listApplications)
	.addDelete(resources.removeApplication)

	swagger.configureDeclaration("appServer", {
		description : "Operações de Servidor de Aplicação",
		authorizations : ["basic"],
		produces: ["application/json"],
		consumes: ['application/json']
	});	

	swagger.configureDeclaration("application", {
		description : "Operações de Aplicação",
		authorizations : ["basic"],
		produces: ["application/json"],
		consumes: ['application/json']
	});

	// set api info
	swagger.setApiInfo({
		title: "Server API",
		description: "API REST para gerenciar um catálogo de servidores de aplicação assim como as aplicações hospedadas nestes.",
		contact: "victor.mendes.eduardo@gmail.com",
	});

	// Configures the app's base path and api version.
	swagger.configureSwaggerPaths("", "api-docs", "")
	swagger.configure("http://server-api-v1.elasticbeanstalk.com", "1.0.0");

	// Serve up swagger ui at /docs via static route
	var docs_handler = express.static(__dirname.replace('/swagger', '') + '/public/swagger-ui');
	app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
		if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
			res.writeHead(302, { 'Location' : req.url + '/' });
			res.end();
			return;
		}
		// take off leading /docs so that connect locates file correctly
		req.url = req.url.substr('/docs'.length);
		return docs_handler(req, res, next);
	});
}