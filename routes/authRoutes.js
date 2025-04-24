const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
// This code defines the authentication routes for user registration and login. It uses Express.js to create a router and defines two POST routes: one for user registration and another for user login. The corresponding controller functions are imported from the authController module. Finally, the router is exported for use in other parts of the application.