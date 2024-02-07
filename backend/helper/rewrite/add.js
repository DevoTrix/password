var mysql = require('mysql2');
const bcrypt = require('bcryptjs');


async function createDB(pool){
    let query = "CREATE DATABASE IF NOT EXISTS DVTrix";
    let database;
    try{
        database = await pool.getConnection();
    }
    catch (error){
        console.error(error);
    }
    try{
        await database.query(query);
    }
    catch (error){
        console.error(error);
    }
    finally{
        if(database){
            database.release();
        }
    }
}


async function createTable(pool){
    let query = "CREATE TABLE IF NOT EXISTS users ( email VARCHAR(30) UNIQUE, username VARCHAR(20) PRIMARY KEY, password VARCHAR(5000) )"
    let database;
    try{
        database = await pool.getConnection();
    }catch (error){
        console.error(error);
    }
    try{
        await database.query(query);
    } catch (error){
        console.error(error);
    }
    let query2 = "CREATE TABLE IF NOT EXISTS events ( eventID VARCHAR(255) PRIMARY KEY, user VARCHAR(20), title VARCHAR(60), description VARCHAR(255), startTime VARCHAR(20), endTime VARCHAR(20), completed TINYINT(1) DEFAULT 0 )"
    try{
        await database.query(query2);
    } catch (error){
        console.error(error);
    }
    finally{
        if(database){
            database.release();
        }
    }

}
async function registerUser(pool, email, username, password){
    let query = "INSERT INTO users (email, username, password) VALUES ( ?, ?, ?)";
    
    try{
        const hash = await bcrypt.hash(password,10);
        let values = [email, username, hash]
        pool.promise().query(query, values);
    } catch (error){
        console.error(error);
    }
}

async function addEvent(pool, user, title, description, startdate, endtime, repeatingEndDate){
    // generate eventID 
    var uniqueID = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
    let query = "INSERT INTO events (eventID, user, title, description, startDate, endTime, completed) VALUES (?, ?, ?, ?, ?, ?, ? )";
    let values = [uniqueID, user, title, description, starttime,endtime, 0];
    try {
        pool.promise().query(query, values);
        // do a check for if repeating now + 7 is greater than the repeating enddate
        var dateEvent = new Date(startdate);
        var endDate = new Date(repeatingEndDate);
        var end = new Date(endtime);
        while( !(dateEvent + 7 >= endDate)){
            dateEvent.setDate(dateEvent.getDate() + 7);
            end = setDate(end.getDate() + 7);
            uniqueID = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
            values = [uniqueID, user, title, description, dateEvent, end, 0];
            pool.promise().query(query, values);
        }
    } catch( error ){
        console.error(error);
    }
}

module.exports = {createDB, createTable, registerUser, addEvent}