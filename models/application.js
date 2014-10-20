var mongoose = require('mongoose');

var ApplicationSchema = new mongoose.Schema({
	name: { type: String, required: true, notEmpty: true , unique: true },
	url: { type: String, required: true, notEmpty: true , unique: true }, //TODO: validar URL
	description: { type: String },
	creationDate: Date, 
	lastUpdated: Date
});

ApplicationSchema.plugin(require('mongoose-unique-validator'));

//Atualiza timestamps de criação e atualização após validação do objeto
ApplicationSchema.post('validate', function (appServer) {
	appServer.lastUpdated = new Date();
	if(appServer.creationDate == null){
		appServer.creationDate = new Date();
	}
})

/**
* Métodos de instancia auxiliares
*/
// Representação do objeto para a 'view' para desacoplar do Schema do mongoDB
ApplicationSchema.methods.toJson = function() {
  return {
		id: this._id,
		name: this.name, 
		url: this.url, 
		description: this.description,
		creationDate: this.creationDate,
		lastUpdated: this.lastUpdated
	}
}

//Populaçao manual do objeto para que o serviço não permita que campos indesejados sejam atualizados
ApplicationSchema.methods.updateProperties = function(reqBody) {
	this.name = reqBody.name;
	this.url = reqBody.url;
	this.description = reqBody.description;
}

module.exports = mongoose.model('Application', ApplicationSchema);