

const objectConverter = require("../utils/objectConverter")

    

const User = require(("../models/user.model"));


exports.findAll = async (req, res) => {
    const users = await User.find();
    return res.status(200).send(objectConverter.userResponse(users))
}