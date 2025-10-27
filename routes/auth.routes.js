const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth.controller");
// const verifyUserReqBody = require("../middlewares/verifyUserreqBody")
const verifyUserReqBody = require("../middlewares/verifyUserReqBody");



route.post("/auth/signup",[verifyUserReqBody.validateUserReqBody], authController.Signup);


module.exports = route ;