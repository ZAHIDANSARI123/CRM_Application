


const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose")
const User = require("./models/user.model")
const bcrypt = require("bcryptjs");


app.use(express.json());

/**
 * Make a conneection with the mongoDB
 */

(async ()=> {


    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crm-app')
        console.log("Mongo Connected");


        /**
         * I need to have a default ADMIN created here from the begging 
         */
        
        const user = await User.findOne({userId : "admin"})

        if (!user) {
            console.log("Admin is not present");
            
            const admin = await User.create({
                name : "Jahid",
                userId : "admin",
                email : "jahid@google.com",
                userType : "ADMIN",
                password : bcrypt.hashSync("Welcome1", 8)
            });
            console.log("Admin created : ", admin);
            
        }else{
            console.log("Admin user is already present !");
            
        }
    } catch (err) {
        
        console.log("Error : ", err);
        
    }
})();


const auth_route = require("./routes/auth.routes");
app.use("/crm/api/v1", auth_route);

const PORT = process.env.PORT || 5555;
console.log(process.env.PORT);

app.listen(PORT, ()=>{
    console.log(`Server started running on the port num : ${PORT}`);
    
})