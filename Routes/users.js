const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");

const router = express.Router();

const UsersController = require("./../Controllers/users");

// API: /api/users/loginUser to login to the application and generate the JSON Web Token.
router.post('/loginUser', UsersController.loginUser);


module.exports = router;