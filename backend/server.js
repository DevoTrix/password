require('dotenv').config();
// var jwt = require("jsonwebtoken"); 
// const User = require('./models/user');
// const Pass = require('./models/pass');
const {addPass, registerUser } = require('./helper/addtoDB');
const {validateUser, getId, verifyToken, tokenify} = require('./helper/login');
const {getAllPass, revealPass} = require('./helper/gettingPass');
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
const db = process.env.DBURL;
// const bcrypt = require("bcryptjs");
const { ref } = require('yup');
mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));







app.post('/api/validate', async (req, res)=>{
    const id = await verifyToken(req,res);
})


app.post('/api/login', async (req, res)=>{
    const {username, password} = req.body;

    try{
        const {status, user} = await validateUser(username, password);
        if(!user){
            const token = tokenify(user.id);
            res.status(status).send({
                token: token
            })
        }
        else{
            res.status(status);
        }
    } catch (error){
        res.status(500);
    }
});

app.post('/api/addPass', async (req,res) => {
    const {token, site, email, username, password} = req.body;
    const user = getId(token);
    if(!user){
        res.status(400).send({message: "Invalid token"})
    }
    else{
        addPass(user._id, site, email, username, password);
        res.status(200).send({message: "success"})
    }
})



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


app.post('/api/getPass', async (req, res) =>{
    const {token} = req.body;

    //handle shit here
    const userId = getId(token);
    if(!userId){
        res.status(400).send({message:"Invalid Token"})
        return;
    }
    const allPass = getAllPass(userId);
    if(allPass){
        res.status(200).json(allPass);
        return;
    }
    res.status(400).send({message: "No password Detected"})
})

app.post('/api/revealPass', async (req,res)=>{
    const {token, site, username} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(400).send({message:"Invalid Token"})
        return;
    }
    const pass = revealPass(userId, username, site);
    if(!pass){
        res.status(400).send({message:"Password/ site not found"})
        return;
    }
    res.status(200).json(pass);
})

app.listen(5000, ()=>{
    console.log("Server Running on http://localhost:5000")
})