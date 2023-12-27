const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type:String,
        required: true,
        default: "info@gmail.com"
    },
    username: {
        type: String,
        required: true,
        default: 'UserName'
    },
    password:{
        type: String,
        required: true,
        default: "password"
    }
})
const User = mongoose.model('user', userSchema)
module.exports = User