import mongoose from "mongoose"
import User from "../models/user"

export  async function registerUser(email, username, password){
    // check if email is already in use
    mongoose.connect(process.env.DATABASE_URL)
    const usr1 = await User.findOne({email: email});
    if(!usr1){
        const usr2 = await User.findOne({username:username});
        if(!usr2){
            // encrypt later
            const test = new User({
                email: email,
                username: username,
                password: password
            })
            test.save();
            return test;
        }
    }
}