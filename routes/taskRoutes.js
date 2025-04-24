const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Test route to create a new task
router.post('/test-task', async (req, res) => {
try {
    // Create a new task document
    const task = new Task({
    name: 'Learn MongoDB',
    completed: false,
    });

    // Save the task to the database
    await task.save();

    res.status(201).json({ message: 'Task created successfully!', task });
} catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
}
});

module.exports = router;
