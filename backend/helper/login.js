var jwt = require("jsonwebtoken"); 
const User = require('../models/user')
// const Pass = require('./models/pass')
const bcrypt = require('bcryptjs')


async function getId(token) {
    if(!token){
        return null
    }
    jwt.verify(token,
        process.env.key,
        (err, decoded) => {
          if (err) {
            return null;
          }
          return decoded.id;
        });
}

async function verifyToken(req, res) {
    const token = req.body;
    if(!token){
        res.status(400).send({message:"Error No Token Provided"})
    }
    await jwt.verify(token,
        process.env.key,
        (err, decoded) => {
          if (err) {
            return res.status(400).send({
              message: "Unauthorized!",
            });
          }
          return decoded.id;
        });
}

async function validateUser( username, password){
    const user = await User.findOne({username: username});
    if(!user){
        return {status:400, user:null }
    }
    const result = bcrypt.compareSync(password, user.password)
    if(result){
        return {status:200, user:user};
    }
    else{
        return {status:404, user:null};
    }

}

function tokenify(userID){
    const token = jwt.sign({ id: userID },
        process.env.key,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 7200, // 24 hours
        });
    return token;
}

module.exports = {validateUser, getId, verifyToken, tokenify}