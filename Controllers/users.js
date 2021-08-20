const axios = require("axios");
const jwt = require("jsonwebtoken");

const UserComponent = require("../Components/UserComponent");


exports.loginUser = async(request, response, next) => {
	const requestBody = request['body'];

	const userServiceResponse = await UserComponent.getUserDataByCredentials(requestBody);
	if(!userServiceResponse)
		response.status(400).json({success: false, message: `Invalid request.`, statusCode: 400});

	if(userServiceResponse['data'])
		userServiceResponse['token'] = UserComponent.generateJWT(userServiceResponse['data']);

	response.status(userServiceResponse['statusCode']).json(userServiceResponse);
};