const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // contains user id
    next();
    } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = protect;
