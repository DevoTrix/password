const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    site: {
        type:String,
        required: true,
        default: "site.com"
    },
    username: {
        type:String,
        required:true,
        default:"UserName"
    },
    email:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
        default: "password"
    }
})
const Pass = mongoose.model('pass',passSchema);
module.exports = Pass