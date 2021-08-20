
const ErrorResponse = require("./../utils/errorResponse");

const errorHandler = (error, request, response, next) => {
	let errorObject = {...error};

	console.log(error.stack);

	errorObject['message'] = error['message'];
	response.status(errorObject['statusCode'] || 500).json({
		'success': false,
		'message': errorObject['message'] || `Server Error`,
		'statusCode': errorObject['statusCode'] || 500
	});
}

module.exports = errorHandler;