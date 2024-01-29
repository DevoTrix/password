var mysql = require('mysql2');
const bcrypt = require('bcrypt');

async function verifyPass(pool, username, password){
    let query = "SELECT * FROM users WHERE username = ?"
    let value = [username]
    const result = await new Promise((resolve, reject)=>{
        pool.query(query, value, (error, elements)=>{
            if(error){
                return false;
            }
            resolve(elements);
        })
    });
    if(result.length === 0){
        return false;
    }
    const response = await bcrypt.compare(password, elements[0].password);
    return response;
}

async function userEvents(pool, userID){
    let query = "SELECT * FROM events WHERE user = ?";
    let value = [userID];
    const events = await new Promise((resolve, reject)=>{
        pool.query(query, value, (error, result)=>{
            if(error){
                return reject(error);
            }
            resolve(result);
        });
    });

    return events
}

async function specificEvent(pool, userID, title){
    let query = "SELECT * FROM events WHERE user = ? AND title = ?";
    let values = [userID, title];
    const event = await new Promise((resolve, reject)=>{
        pool.query(query, values, (error, result)=>{
            if(error){
                return reject(error);
            }
            resolve(result);
        });
    });

    return event
}

module.exports = {verifyPass,userEvents, specificEvent}