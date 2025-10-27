const User = require("../models/user.model");
const constants = require("../utils/constants")

validateUserRequestBody = async (req, res, next) => {


    // Validate the username
    if (!req.body.name) {
        res.status(400).send({
            message : "Failed ! Bad Request, userName field is not passed or empty"
        });
        return ;
    }

    // Validate the password
    if (!req.body.password) {
        res.status(400).send({
            message : "Failed ! Bad Request, Password field is not passed or empty"
        });
        return ;
    }


    if (!req.body.userId) {
        res.status(400).send({
            message : "Failed ! Bad Request, userId field is not passed or empty"
        });
        return ;
    }


    // Let check if the userId is unique
    const user =  await User.findOne({userId : req.body.userId});
    if (user!=null) {
        res.status(400).send({
            message : "Failed ! Bad Request, userId field is already registered please change and try "
        });
        return ;
    }


    if (!req.body.email) {
        res.status(400).send({
            message : "Failed ! Bad Request, email field is not passed or empty"
        });
        return ;
    }


    // Let check if the email id  is unique
    const user1 =  await User.findOne({email : req.body.email});
    if (user1!=null) {
        res.status(400).send({
            message : "Failed ! Bad Request, userId field is already registered please change and try "
        });
        return ;
    }


    // validating the userType 
    const possibleUserTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin]

    if (req.body.userType && possibleUserTypes.includes(req.body.userType)) {
        res.status(400).send({
            message : "UserType passed is invalid ! .. please correct and re-try "
        });
        return ;
    }

    next();

}

module.exports = {
    validateUserReqBody : validateUserRequestBody
}