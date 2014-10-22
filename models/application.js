var mongoose = require('mongoose');

var urlregex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

var ApplicationSchema = new mongoose.Schema({
	name: { type: String, required: true, notEmpty: true , unique: true },
	url: { type: String, required: true, notEmpty: true , unique: true, match: urlregex },
	description: { type: String },
	lastUpdated: Date
});

ApplicationSchema.plugin(require('mongoose-unique-validator'));

//Atualiza timestamps de criação e atualização após validação do objeto
ApplicationSchema.post('validate', function (appServer) {
	appServer.lastUpdated = new Date();
});

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
		creationDate: this._id.getTimestamp(),
		lastUpdated: this.lastUpdated
	}
}

//Populaçao manual do objeto para que o serviço não permita que campos indesejados sejam atualizados
ApplicationSchema.methods.updateProperties = function(reqBody) {
	this.name = reqBody.name;
	this.url = reqBody.url;
	this.description = reqBody.description;
}
var model = mongoose.model('Application', ApplicationSchema);
module.exports = model;

model.schema.path('name').validate(function (value) {
	return !value ? true :value.length <= 50;
}, 'Name should not be longer than 50 characters');

model.schema.path('description').validate(function (value) {
	return !value ? true : value.length <= 255;
}, 'Name should not be longer than 255 characters');
