const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        default: "Event"
    },
    description:{
        type: String,
        required: false,
        default: "Enter Descritpion"
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    }
})
const Event = mongoose.model('event',eventSchema);
module.exports = Event;