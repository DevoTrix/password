// var jwt = require("jsonwebtoken"); 
const User = require('../models/user')
const bcrypt = require('bcryptjs')


async function registerUser(email, username, password){
    // check if email is already in use
    // mongoose.connect(process.env.DATABASE_URL
    const usr1 = await User.findOne({email: email}).lean();

    const usr2 = await User.findOne({username:username}).lean();
    
    if(!usr1 && !usr2){
        let savedUser = null;
        hash = process.env.HASH;
        bcrypt.genSalt(hash, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hashs) {
                const newUser = new User({
                    email: email,
                    username: username,
                    password: hashs // Store the hashed password in the database
                    });
                    // Save the user to the database
                newUser.save();
                });
            });

        // const saltRound =  parseInt(process.env.SR);
        // const salt = await bcrypt.genSalt(saltRound);
        // const hash = await bcrypt.hash(password, salt);
        
        // await test.save();
        return {status:200, user:newUser};
    }
    if(usr1){
        return {status:400, user:usr1}
    }
    return {status:401, message:"Error"}
}

module.exports =  {registerUser}