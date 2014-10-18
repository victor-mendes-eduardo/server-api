var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
	name: { type: String, required: true }, // TODO: deve ser unique
	url: { type: String, required: true }, // TODO: deve ser unique
	description: { type: String }
});

module.exports = mongoose.model('Application', ApplicationSchema);

//TODO: adicionar validação