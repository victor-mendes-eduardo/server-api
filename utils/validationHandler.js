exports.buildErrorReport = function (errors){
	var errorReport = new Array();
	for (var property in errors.errors) {
    	errorReport.push({ field: errors.errors[property].path, message: errors.errors[property].message });
	}
	return errorReport;
};
