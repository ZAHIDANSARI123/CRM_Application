const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth.controller");


route.post("/auth/signup", authController.Signup);


module.exports = route ;