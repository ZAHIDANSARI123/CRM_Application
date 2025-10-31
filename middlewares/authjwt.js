const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants")


const verifyToken = (req, res, next) => {
    

    const token = req.headers["x-access-token"];

    if (!token) {
        res.status(403).send({
            message : "No Access Token Passed"
        });
    }


    // Verification of the jwt token
    jwt.verify(token, config.secret, (err, decoded)=>{
        if (err) {
            return res.status(401).send({
                message : "UnAuthorized!"
            })
        }
        
        req.userId = decoded.id ;  // We will cover this in a while 
    })

    next()
}

const isAdmin = async (req, res, next) => {
    const user = User.findOne({userId : req.userId});


    if (user && user.userType == constants.userTypes.admin) {
        next();
    }else{
        res.status(403).send({
            message : "Only ADMIN Role is allowed access to this API"
        });
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}