const mongoose = require('mongoose');

// Define a schema for the task
const taskSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},
completed: {
    type: Boolean,
    default: false,
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
}, { timestamps: true });


// Create a model based on the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
