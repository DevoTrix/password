var mysql = require("mysql2")

async function updateUser(pool, userID, newPassword){
    let query = "UPDATE user SET password = ? WHERE username = ?";
    let values = [newPassword, userID];
    try{
        await pool.query(query, values);
        return true;
    } catch (error){
        console.error(error);
        return false;
    }
}

async function updateEventTitle(pool, userID, oldTitle, newTitle){
    let query = "UPDATE user SET title = ? WHERE username = ? AND title = ?";
    let values = [newTitle, userID, oldTitle];
    try{
        await pool.query(query, values);
        return true;
    } catch (error){
        console.error(error);
        return false;
    }

}

async function updateEventDescription( pool, userID, title, newDescription){
    let query = "UPDATE user SET description = ? WHERE username = ? AND title = ?";
    let values = [newDescription, userID, title];
    try{
        await pool.query(query, values);
        return true;
    } catch (error){
        console.error(error);
        return false;
    }
}

async function markEventComplete(pool, userID, title){
    let query = "UPDATE user SET completed = 1 WHERE username = ? AND title = ?";
    let values = [userID, title];
    try{
        await pool.query(query, values);
        return true;
    } catch (error){
        console.error(error);
        return false;
    }

}

async function markEventIncomplete(pool, userID, title){
    let query = "UPDATE user SET completed = 0 WHERE username = ? AND title = ?";
    let values = [userID, title];
    try{
        await pool.query(query, values);
        return true;
    } catch (error){
        console.error(error);
        return false;
    }
}

async function updateEventDate(pool,userID, title, newDate){
    let query = "UPDATE user SET date = ? WHERE username = ? AND title = ?";
    let values = [newDate, userID, title];
    try{
        await pool.query(query, values);
        return true;
    } catch (error){
        console.error(error);
        return false;
    }
}


module.exports = {updateUser, updateEventTitle, updateEventDescription, markEventComplete, markEventIncomplete, updateEventDate}