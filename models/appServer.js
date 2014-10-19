var Application = require('../models/application');
var mongoose = require('mongoose');

var ipAddressRegex = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
var possibleStatus = 'RUNNING STOPPED'.split(' ');

var enu = {
	values: 'RUNNING STOPPED'.split(' '),
	message: 'Invalid status. Valid options are RUNNING and STOPPED'
}

var AppServerSchema = new mongoose.Schema({
	name: { type: String, required: true, notEmpty: true , unique: true },
	status: { type: String, required: true, notEmpty: true , enum: enu },
	ipAddress: { type: String, required: true, notEmpty: true, unique: true , match: ipAddressRegex },
	applications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Application'}],
	tags: [String], 
	creationDate: Date, 
	lastUpdated: Date
});

AppServerSchema.plugin(require('mongoose-unique-validator'));

//Atualiza timestamps de criação e atualização após validação do objeto
AppServerSchema.post('validate', function (appServer) {
	appServer.lastUpdated = new Date();
	if(appServer.creationDate == null){
		appServer.creationDate = new Date();
	}
})

/**
* Campos virtuais
*/
//Mantem as aplicações do servidor em um campo virtual e associa os IDs para serem persistidos
AppServerSchema.virtual('applicationModels').set(function(models) {
 	for(var index in models){
		var model = models[index]
		this.applications.push(model._id);

		if(!this._apps){
			this._apps = new Array();
		}
		this._apps.push(model);
	}
});

AppServerSchema.virtual('applicationModels').get(function() {
 	return this._apps
});

/**
* Métodos de instancia auxiliares
*/
// Representação do objeto para a 'view' para desacoplar do Schema do mongoDB
AppServerSchema.methods.toJson = function() {
  return {
		id: this._id,
		name: this.name, 
		status: this.status, 
		ipAddress: this.ipAddress,
		tags: this.tags,
		applications: this.applications,
		creationDate: this.creationDate,
		lastUpdated: this.lastUpdated
	}
}

//Populaçao manual do objeto para que o serviço não permita que campos indesejados sejam atualizados
AppServerSchema.methods.updateProperties = function(reqBody) {
	this.name = reqBody.name;
	this.status = reqBody.status;
	this.ipAddress = reqBody.ipAddress;
	this.tags = reqBody.tags;

	// Popula as aplicações e associa a um campo virtual
	var applicationModels = new Array();
	for(var index in reqBody.applications){
		var applicationModel = new Application();
		applicationModel.updateProperties(reqBody.applications[index]);
		applicationModels.push(applicationModel);
	}
	this.applicationModels = applicationModels;
}

module.exports = mongoose.model('AppServer', AppServerSchema);