const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config({path: "./Configurations/configurations.env"});

// Route files.
const usersRoute = require("./Routes/users");

const app = express();

app.use(express.json());
app.use(cookieParser());
if(process.env.NODE_ENV === "development")
	app.use(morgan('dev'));


// Mounting the routes.
app.use(`/api/users`, usersRoute);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));

process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error['message']}`);
	server.close(() => process.exit(1));
});