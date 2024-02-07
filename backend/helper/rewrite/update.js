var mysql = require("mysql2")

async function updateUser(pool, userID, newPassword){
    let query = "UPDATE user SET password = ? WHERE username = ?";
    let values = [newPassword, userID];
    // try{
    //     // await pool.query(query, values);
    //     pool.promise().query(query, values);
    //     return true;
    // } catch (error){
    //     console.error(error);
    //     return false;
    // }
    pool.promise().query(query, values).then(()=>{
        return true;
    }).catch((err)=>{
        return false;
    });
}

async function updateEventTitle(pool, userID, oldTitle, newTitle){
    let query = "UPDATE events SET title = ? WHERE user = ? AND title = ?";
    let values = [newTitle, userID, oldTitle];
    pool.promise().query(query, values).then(()=>{
        return true;
    }).catch((err)=>{
        return false;
    });

}

async function updateEventDescription( pool, userID, title, newDescription){
    let query = "UPDATE events SET description = ? WHERE user = ? AND title = ?";
    let values = [newDescription, userID, title];
    pool.promise().query(query, values).then(()=>{
        return true;
    }).catch((err)=>{
        return false;
    });
}

async function markEventComplete(pool, userID, title, startDate){
    let query = "UPDATE events SET completed = 1 WHERE user = ? AND title = ? and startDate = ?";
    let values = [userID, title, startDate];
    pool.promise().query(query, values).then(()=>{
        return true;
    }).catch((err)=>{
        return false;
    });

}

async function markEventIncomplete(pool, userID, title, startDate){
    let query = "UPDATE events SET completed = 0 WHERE user = ? AND title = ? AND startDate = ?";
    let values = [userID, title, startDate];
    pool.promise().query(query, values).then(()=>{
        return true;
    }).catch((err)=>{
        return false;
    });
}


async function updateEventDate(pool,userID, title, oldTime, newStartTime, newEndTime){
    let query = "UPDATE events SET startTime = ? AND endTime = ? WHERE user = ? AND title = ? AND startTime = ?";
    let values = [newStartTime, newEndTime, userID, title, oldTime];
    pool.promise().query(query, values).then(()=>{
        return true;
    }).catch((err)=>{
        return false;
    });
}




module.exports = {updateUser, updateEventTitle, updateEventDescription, markEventComplete, markEventIncomplete, updateEventDate}