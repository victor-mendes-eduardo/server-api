//TODO: customizar mensagens

var mongoose = require('mongoose');

var ipAddressRegex = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
var possibleStatus = 'RUNNING STOPPED'.split(' ');

var AppServerSchema = new mongoose.Schema({
	name: { type: String, required: true, notEmpty: true , unique: true },
	status: { type: String, required: true, notEmpty: true , enum: possibleStatus },
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


// Representação do objeto para a 'view' para desacoplar do Schema do mongoDB
AppServerSchema.methods.toJson = function() {
  return {
		id: this._id,
		name: this.name, 
		status: this.status, 
		ipAddress: this.ipAddress,
		tags: this.tags
	}
}

//Populaçao manual do objeto para que o serviço não permita que campos indesejados sejam atualizados
AppServerSchema.methods.updateProperties = function(reqBody) {
	this.name = reqBody.name;
	this.status = reqBody.status;
	this.ipAddress = reqBody.ipAddress;
	this.tags = reqBody.tags;
}

module.exports = mongoose.model('AppServer', AppServerSchema);