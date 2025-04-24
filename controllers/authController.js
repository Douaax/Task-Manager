const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }   catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
        res.json({ message: 'Login successful', token });
    }   catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = { register, login };
