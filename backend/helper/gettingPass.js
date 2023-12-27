var jwt = require("jsonwebtoken"); 
const User = require('../models/user')
const Pass = require('../models/pass')
const bcrypt = require('bcryptjs')

async function getAllPass(userId){
    // get in list
    const pass = Pass.find({user:userId});
    return pass;
}

async function revealPass(userId, username, site){
    const pass = Pass.findOne({user:userId, username:username, site:site})
    //do the whole unencryption
    return pass;
}


module.exports = {getAllPass, revealPass}