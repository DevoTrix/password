var mysql = require('mysql2');
const bcrypt = require('bcrypt');

async function verifyPass(pool, username, password){
    let query = "SELECT * FROM users WHERE username = ?"
    let value = [username]
    // const result = await new Promise((resolve, reject)=>{
    //     pool.query(query, value, (error, elements)=>{
    //         if(error){
    //             return false;
    //         }
    //         resolve(elements);
    //     })
    // });
    var result;
    await con.promise().query(query, value)
        .then(([rows, fields]) => {
            result = rows;
        })    
        .catch((err) => {
            console.error(err);
         });
    if(result.length === 0){
        return false;
    }
    const response = await bcrypt.compare(password, result[0].password);
    return response;
}

async function userEvents(pool, userID){
    let query = "SELECT * FROM events WHERE user = ?";
    let value = [userID];
    // const events = await new Promise((resolve, reject)=>{
    //     pool.query(query, value, (error, result)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         resolve(result);
    //     });
    // });
    var events;
    await con.promise().query(query, value)
        .then(([rows, fields]) => {
            events = JSON.stringify(rows);
        })    
        .catch((err) => {
            console.error(err);
         });

    return events
}

async function specificEvent(pool, userID, title){
    let query = "SELECT * FROM events WHERE user = ? AND title = ?";
    let values = [userID, title];
    // const event = await new Promise((resolve, reject)=>{
    //     pool.query(query, values, (error, result)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         resolve(result);
    //     });
    // });
    var events;
    await con.promise().query(query, value)
        .then(([rows, fields]) => {
            events = JSON.stringify(rows);
        })    
        .catch((err) => {
            console.error(err);
         });

    return events;

}

module.exports = {verifyPass,userEvents, specificEvent}