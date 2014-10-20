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
	applications: [{ type: mongoose.Schema.Types.Mixed }],
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
}

AppServerSchema.methods.addApplication = function(application) {
	if(!this.applications){
		this.applications = new Array();
	}
	
	var applicationIsInCollection = false
	for(var index in this.applications) {
		var app = this.applications[index]
        if (app.name == application.name || app.id == application.id){
        	applicationIsInCollection = true;	
        }
    }

	if(!applicationIsInCollection){
		this.applications.push(application.toJson ? application.toJson() : application);
	}
}

AppServerSchema.methods.removeApplication = function(applicationId) {
	for(var index in this.applications){
		var application = this.applications[index];
		if(application.id == applicationId){
 			this.applications.splice(index, 1);
			return;
		}
	}
}

module.exports = mongoose.model('AppServer', AppServerSchema);