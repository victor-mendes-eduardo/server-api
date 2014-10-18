exports.getService = function (serviceName, version){
	try{
		return require('../services/' + serviceName + 'Service' + version.toUpperCase());
	}catch(err){
		//TODO: melhorar tratamento de versão não suportada
		console.log('Error, vesion not found!');
	}
};