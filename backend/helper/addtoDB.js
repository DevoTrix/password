// var jwt = require("jsonwebtoken"); 
const User = require('../models/user')
const Pass = require('../models/pass')
const bcrypt = require('bcryptjs')
async function addPass(user, site, email, username, password){
    // TODO: do encryption of password that could be encrypted
    const encrypted = "testing"

    const pass = new Pass({
        user: user,
        site: site,
        username: username,
        email: email,
        password:encrypted
    })

    await pass.save()
    return;
}

async function registerUser(email, username, password){
    // check if email is already in use
    // mongoose.connect(process.env.DATABASE_URL
    let usr1 = await User.findOne({email: email});
    if(!usr1) {
        usr1 = await User.findOne({username:username});
    }
    if(!usr1){
        const saltRound =  parseInt(process.env.SR);
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: email,
            username: username,
            password: hash // Store the hashed password in the database
            });
        
            // Save the user to the database
            const savedUser = await newUser.save();
        // await test.save();
        return {status:200, user:savedUser};
    }
    if(usr1){

        return {status:400, user:usr1}
    }
}

module.exports = {addPass, registerUser}