const mongoose = require('mongoose');
const { use } = require('../controllers/task.controller');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
}, {
    versionKey: false
});

const task = mongoose.model('tasks', taskSchema);
module.exports = task;
