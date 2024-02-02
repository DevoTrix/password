require('dotenv').config();
// imports
// const { registerUser } = require('./helper/addtoDB');
// const {validateUser, getId, verifyToken, tokenify} = require('./helper/login');
// const {getUserEvent, getAllEvents, getSpecificEvent,markEventAsCompleted, markEventAsIncomplete, changeTitle, updateDescription,
    // changeDate
// } =require('./helper/getEvents')


const {getID, tokenify } = require('./helper/rewrite/tokenization');
const {createDB, createTable, registerUser, addEvent} = require('./helper/rewrite/add');
const {verifyPass,userEvents, specificEvent} = require('./helper/rewrite/pull');
const {updateUser, updateEventTitle, updateEventDescription, markEventComplete, 
    markEventIncomplete, updateEventDate} = require('./helper/rewrite/update');


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

var mysql = require('mysql2');


//beginning of posts
//logging in portions
app.post('/api/validate', async (req, res)=>{
    const token = req.body;
    const id = await getID(token);
    if(!id){
        res.status(401).send({message: 'Invalid Token'});
        return;
    }
    res.status(200).send({user: id});
})


app.post('/api/login', async (req, res)=>{
    const {username, password} = req.body;
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    const verified = await verifyPass(pool, username, password);
    if(!verified){
        pool.releaseConnection();
        res.status(400).send({message:"invalid Password"});
        return;
    }
    pool.releaseConnection();
    res.status(200).send();
});

//end of logging in

//registering a new user
app.post('/api/users', async (req, res) => {
    const {email, username, password} = req.body;

    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    await registerUser(pool, email, username, password);
    res.status(200).send();
    
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
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    const events = userEvents(pool, userId);
    pool.releaseConnection();
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
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });
    const event = specificEvent(pool, userId, title);
    pool.releaseConnection();
    if(!event){
        res.status(400).send({message: "no event found"});
        return;
    }
    res.status(200).json(event);
})



app.post('/api/updateTitle', async (req, res)=>{
    const {token, title, newTitle} = req.body;


    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }
    // const updated = changeTitle(userId, title, newTitle);
    const updated = await updateEventTitle(pool, userId, title, newTitle);
    pool.releaseConnection();
    if(!updated){
        res.status(400).send({message: "title not updated"});
        return;
    }
    res.status(200);
})

app.post('/api/completed', async (req, res) =>{
    const {token, title} = req.body;
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = await markEventComplete(pool, userId, title);
    pool.releaseConnection();
    if(!updated){
        res.status(400).send({message: "Event not marked completed"});
        return;
    }
    res.status(200);
})

app.post('/api/incompleted', async (req, res)=>{
    const {token, title} = req.body;
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = await markEventIncomplete(pool,userId, title);
    pool.releaseConnection();
    if(!updated){
        res.status(400).send({message: "Event not marked incomplete"});
        return;
    }
    res.status(200);
})

app.post('/api/updateDescription', async(req,res)=>{
    const {token, title, description} = req.body;
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    const userId = getId(token);
    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = await updateEventDescription(pool, userId, title, description);
    pool.releaseConnection();
    if(!updated){
        res.status(400).send({message: "Description not updated"});
        return;
    }
    res.status(200);
})

app.post('/api/changeDate', async (req, res)=>{
    const {token, title, date} = req.body;
    const userId = getId(token);
    var pool = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        port: 3306,
        user: "Devo",
        password: "Buddy-71597",
        database: "DVTrix"
    });

    if(!userId){
        res.status(401).send({message: "invalid token"});
        return;
    }

    const updated = await updateEventDate(pool,userId, title, date);
    pool.releaseConnection()
    if(!updated){
        res.status(400).send({message: "date not updated"});
        return;
    }
    res.status(200);
})

// testing
//end of events

// end of posts
//final
app.listen(5000, async ()=>{
    // mongodb connect
    const db = process.env.DBURL;
    // mongoose.connect(db);
    
    console.log("Server Running on http://localhost:5000")
})