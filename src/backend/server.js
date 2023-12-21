require('dotenv').config();

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
const db = process.env.DBURL;
const bcrypt = require("bcryptjs");
const CryptoJS = require('cryptojs');
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

const User =  mongoose.model('user', userSchema);

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
        return {status:600, user:null};
    }

}



app.post('/api/validate', async (req, res)=>{
    const {username, password} = req.body;

    try{
        const {status, user} = await validateUser(username, password);
        res.status(status).json(user);
    } catch (error){
        res.status(500);
    }
});





app.post('/api/users', async (req, res) => {
    const {email, username, password} = req.body;
    // const test = registerUser(email, username, password
    // console.log(email + password + username)
    try{
        const {status, user} = await registerUser(email,username, password);
        // const test = new User({ email:email, username:username, password:password})
        // console.log(email + password + username)
        // await test.save();
        res.status(status).json(user);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
})

app.listen(5000, ()=>{
    console.log("Server Running on http://localhost:5000")
})