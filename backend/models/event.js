const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: string,
        required: true,
        default: "Event"
    },
    description:{
        type: string,
        required: false,
        default: "Enter Descritpion"
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})
const Event = mongoose.model('event',eventSchema);
module.exports = Event;