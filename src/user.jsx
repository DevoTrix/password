import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

module.exports = mongoose.model('user', userSchema);
