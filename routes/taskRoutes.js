const express = require('express');
const router = express.Router();

// ✅ Middlewares
const protect = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validateTask');

// ✅ Controller functions
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

// ✅ Apply authentication to all routes
router.use(protect);

// ✅ Task Routes
router.post('/create-task', validateTask, createTask); // Create task
router.get('/', getAllTasks);                          // Get all tasks
router.get('/:id', getTaskById);                       // Get task by ID
router.put('/:id', validateTask, updateTask);          // Update task
router.delete('/:id', deleteTask);                     // Delete task

module.exports = router;
