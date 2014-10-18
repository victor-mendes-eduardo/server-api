exports.getService = function (serviceName, version){
	return require('../services/' + serviceName + 'Service' + version.toUpperCase());
};