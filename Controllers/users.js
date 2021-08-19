const axios = require("axios");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../Middlewares/async");
const ErrorResponse = require("../Utilities/errorResponse");



exports.loginUser = asyncHandler(async(request, response, next) => {
	const requestBody = request['body'];

	const userServiceResponse = await axios.post(`${process.env.USER_SERVICE_DEVELOPMENT}/getUserData`, requestBody);
	if(!userServiceResponse || !userServiceResponse['data']['data'])
		return new ErrorResponse(`Invalid request olll.`, 400);

	const token = await generateJWT(userServiceResponse['data']['data']);

	response.status(200).json({success: true, message: `Authentication successful`, token: token});
});

const generateJWT = (userData) => {
	const userID = userData['_id'];
	return jwt.sign({'userID': userID}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}