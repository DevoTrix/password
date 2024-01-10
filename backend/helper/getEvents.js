const User = require('../models/user')
const Event = require('../models/event')

async function getUserEvent(userID){
    const user = await User.find({_id: userID})
    if (!user) {
        return null;
    }
    const events = await Event.find({user: user._id})
    if (!events) {
        return null;
    }
    return events;
}

async function getAllEvents(){
    const events = await Event.find();
    return events;
}

async function getSpecificEvent(userID, title){
    const user = await User.find({userID})
    if(!user){
        return null;
    }
    const events = await Event.find({user: user._id, title:title});
    return events;
}

async function markEventAsCompleted(userID, title){
    const user = await User.find({userID});
    if(!user){
        return false;
    }
    try {
        await Event.updateOne({user: user._id, title: title}, {
            completed: true
        });
        return true;
    } catch(error){
        return false;
    }
    //update the mongodb complete tab here to true
}

async function markEventAsIncomplete(userID, title){
    const user = await User.find({userID});
    if(!user){
        return false;
    }
    try {
        await Event.updateOne({user: user._id, title: title}, {
            completed: false
        });
        return true;
    } catch (error){
        return false;
    }
    //update the mongodb complete tab here to false
}

async function changeTitle(userID, title, newTitle){
    const user = await User.find({userID});
    if(!user){
        return false;
    }
    try {
        await Event.updateOne({user: user._id, title: title}, {
            title: newTitle
        });
        return true;
    } catch (error){
        return false;
    }
}

async function updateDescription(userID, title, description){
    const user = await User.find({userID});
    if(!user){
        return false;
    }
    try {
        await Event.updateOne({user: user._id, title: title},{
            description: description
        });
        return true;
    } catch (error){
        return false;
    }
}

async function changeDate( userID, title, date){
    const user = await User.find({userID});
    if(!user){
        return false;
    }
    try {
        await Event.updateOne({user: user._id, title: title},{
            date: date
        });
    } catch (error){
        return false;
    }
}

module.exports =  {getUserEvent, getAllEvents, getSpecificEvent,markEventAsCompleted,markEventAsIncomplete, changeTitle,updateDescription, changeDate};
