const ErrorResponse = require("./../utils/errorResponse");

const errorHandler = (error, request, response, next) => {
	let errorObject = {...error};

	errorObject['message'] = error['message'];

	response.status(errorObject['statusCode'] || 500).json({success: false, message: errorObject['message'] || `Server Error. Please try again.`});
}

module.exports = errorHandler;