require('dotenv').config();
// imports
const { registerUser } = require('./helper/addtoDB');
const {validateUser, getId, verifyToken, tokenify} = require('./helper/login');
const {getUserEvent, getAllEvents, getSpecificEvent,markEventAsCompleted, markEventAsIncomplete, changeTitle, updateDescription,
    changeDate
} =require('./helper/getEvents')
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
// const bcrypt = require("bcryptjs");
const { ref } = require('yup');
//end of imports
//setting up apps
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//beginning of posts
//logging in portions
app.post('/api/validate', async (req, res)=>{
    await verifyToken(req,res);
})


app.post('/api/login', async (req, res)=>{
    try{
       await validateUser(req, res);
        
    } catch (error){
        res.status(500);
    }
});

//end of logging in

//registering a new user
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

//end of registering


//beginning of  events
app.post('/api/getEvents', async (req, res)=>{
    const {token} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"})
        return;
    }
    const events = getUserEvent(userId);
    if(!events){
        res.status(401).send({message: 'user has no events or user not found'})
        return;
    }
    res.status(200).json(events);
});

app.post('/api/getSpecificEvent', async (req, res)=>{
    const{token, title} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"})
        return;
    }
    const event = getSpecificEvent(userId, title);
    if(!event){
        res.status(400).send({message: "no event found"});
        return;
    }
    res.status(200).json(event);
})

app.post('/api/updateTitle', async (req, res)=>{
    const {token, title, newTitle} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }
    const updated = changeTitle(userId, title, newTitle);
    if(!updated){
        res.status(400).send({message: "title not updated"});
        return;
    }
    res.status(200);
})

app.post('/api/completed', async (req, res) =>{
    const {token, title} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = markEventAsCompleted(userId, title);
    if(!updated){
        res.status(400).send({message: "Event not marked completed"});
        return;
    }
    res.status(200);
})

app.post('/api/incompleted', async (req, res)=>{
    const {token, title} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = markEventAsIncomplete(userId, title);
    if(!updated){
        res.status(400).send({message: "Event not marked incomplete"});
        return;
    }
    res.status(200);
})

app.post('/api/updateDescription', async(req,res)=>{
    const {token, title, description} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = updateDescription(userId, title, description);
    if(!updated){
        res.status(400).send({message: "Description not updated"});
        return;
    }
    res.status(200);
})

app.post('/api/changeDate', async (req, res)=>{
    const {token, title, date} = req.body;
    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = changeDate(userId, title, date);
    if(!updated){
        res.status(400).send({message: "date not updated"});
        return;
    }
    res.status(200);
})


//end of events

// end of posts

//final
app.listen(5000, ()=>{
    // mongodb connect
    const db = process.env.DBURL;
    mongoose.connect(db);
    console.log("Server Running on http://localhost:5000")
})