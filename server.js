const dotenv = require("dotenv").config()
const express = require('express');
const apps = express();

// Environment initiate
const PORT = process.env.SERVER_PORT;

//Request body init
apps.use(express.json())
apps.use(express.urlencoded({extended:false}))

// Student Routing from routes
apps.use("/students",require("./routes/student.js"))

apps.listen(5050, () => console.log(` Server is runing on ${PORT} port `))