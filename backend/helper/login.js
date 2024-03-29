var jwt = require("jsonwebtoken"); 
const User = require('../models/user')
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
        console.log("error no token");
        res.status(403).send({message:"Error No Token Provided"})
    }
    jwt.verify(token,
        process.env.key,
        (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!",
            });
          }
          return res.status(200).send({ id: decoded.id});
        });
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

async function validateUser( req, res){
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if(!user){
        res.status(402).send({message:"User Not Found"})
    }
    let result = false;
    bcrypt.compare(password,user.password, function(error, response) {
      result = response;
    })
    // const result = bcrypt.compareSync(password, user.password)
    if(result){
        const token = tokenify(user.id);
        // console.log(token)
        res.status(200).send({token: token})
    }
    else{
        res.status(401).send({message:"incorrect Password"})
    }
}

module.exports = {validateUser, getId, verifyToken, tokenify}