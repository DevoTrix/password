var mysql = require("mysql2");
var jwt = require("jsonwebtoken");

async function getID(token){
    if(!token){
        return null;
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

async function tokenify(username){
    const token = jwt.sign({ id: username },
        process.env.key,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 7200, // 24 hours
        });
      return token;
}


module.exports = { getID, tokenify }