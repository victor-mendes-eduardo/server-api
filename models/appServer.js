//TODO: adicionar timesttamsp
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppServerSchema = new Schema({
	name: { type: String, required: true }, // TODO: deve ser unique
	status: { type: String, required: true }, // TODO: validar Status
	ipAddress: { type: String, required: true }, // TODO: validar IP
	applications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Application'}],
	tags: Array
});

// Representação do objeto para a 'view' para desacoplar do modelo do mongoDB
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