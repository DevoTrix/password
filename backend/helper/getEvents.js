const User = require('../models/user')
const Event = require('../models/event')

export async function getUserEvent(userID){
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

export async function getAllEvents(){
    const events = await Event.find();
    return events;
}

export async function getSpecificEvent(userID, title){
    const user = await User.find({userID})
    if(!user){
        return null;
    }
    const events = await Event.find({user: user._id, title:title});
    return events;
}

export async function markEventAsCompleted(userID, title){
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

export async function markEventAsIncomplete(userID, title){
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

export async function changeTitle(userID, title, newTitle){
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

export async function updateDescription(userID, title, description){
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

export async function changeDate( userID, title, date){
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


