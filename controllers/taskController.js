const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger'); // Ensure you have logger.js in utils

const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed for task creation', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, completed } = req.body;

        // ✅ Attach the user to the task
        const newTask = new Task({ 
            name, 
            completed, 
            user: req.user.id 
        });

        await newTask.save();
        logger.info(`Task created: ${newTask._id} by user ${req.user.id}`);
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        logger.error(`Error creating task: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        logger.info('Fetched all tasks');
        res.status(200).json(tasks);
    } catch (error) {
        logger.error(`Error fetching tasks: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            logger.warn(`Task not found: ${req.params.id}`);
            return res.status(404).json({ message: 'Task not found' });
        }
        logger.info(`Fetched task: ${req.params.id}`);
        res.status(200).json(task);
    } catch (error) {
        logger.error(`Error fetching task: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const { name, completed } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { name, completed },
            { new: true }
        );

        if (!task) {
            logger.warn(`Task to update not found: ${req.params.id}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        logger.info(`Task updated: ${req.params.id}`);
        res.status(200).json(task);
    } catch (error) {
        logger.error(`Error updating task: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            logger.warn(`Task to delete not found: ${req.params.id}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        logger.info(`Task deleted: ${req.params.id}`);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
