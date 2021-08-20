const axios = require("axios");
const { response } = require("express");
const jwt = require("jsonwebtoken");

exports.getUserDataByCredentials = async(requestBody) => {
	const responseData = {success: false, message: `Invalid request.`, statusCode: 400};

	if(!requestBody['phoneNumber'] || !requestBody['password']) {
		responseData['message'] = `Invalid credentials`;
		return responseData;
	}

	try {
		const response = await axios.post(`${process.env.USER_SERVICE_DEVELOPMENT}/v1/users/getUserData`, requestBody);
		if(!response['data']) {
			responseData['message'] = `Invalid request. Please try again.`;
			return responseData;
		}

		if(response['data']['success']) {
			responseData['success'] = response['data']['success'];

			if(response['data']['message'])
				responseData['message'] = response['data']['message'];

			if(response['data']['statusCode'])
				responseData['statusCode'] = response['data']['statusCode'];

			if(response['data']['data']) {
				if(response['data']['data']['password'])
					delete response['data']['data']['password'];
				responseData['data'] = response['data']['data'];
			}
		}
	} catch(error) {
		if(error['response']['data']) {
			if(error['response']['data']['success'])
				responseData['success'] = error['response']['data']['success'];

			if(error['response']['data']['message'])
				responseData['message'] = error['response']['data']['message'];

			if(error['response']['data']['statusCode'])
				responseData['statusCode'] = error['response']['data']['statusCode'];
		}
	}

	return responseData;
}

exports.generateJWT = (userData) => {
	const userID = userData['_id'];
	return jwt.sign({'userID': userID}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}