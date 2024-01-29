var mysql = require('mysql2');
const bcrypt = require('bcrypt');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Buddy-71597",
    database: "user"
});
async function createTable(pool){
    let query = "CREATE TABLE IF NOT EXISTS users ( email VARCHAR(30) UNIQUE, username VARCHAR(20) PRIMARY KEY, password VARCHAR(50) )"
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
    let query2 = "CREATE TABLE IF NOT EXISTS events ( eventID VARCHAR(255) PRIMARY KEY, user VARCHAR(20), title VARCHAR(60), description VARCHAR(255), date VARCHAR(10), completed TINYINT(1) DEFAULT 0 )"
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
        const database = await pool.getConnection();
        const hash = await bcrypt.hash(password,10);
        let values = [email, username, hash]
        await database.query(query, values);
    } catch (error){
        console.error(error);
    }
    finally{
        if(database){
            database.release();
        }
    }
}

async function addEvent(pool, user, title, description, date){
    // generate eventID 
}

module.exports = {createTable, registerUser, addEvent}