const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // To load variables from the .env file
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON in the request body

app.use('/api/auth', authRoutes); // Use authentication routes


// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)

// This block will execute if the connection is successful, and it will log 'Connected to MongoDB'.
.then(() => {
console.log('Connected to MongoDB');
})
// This block will execute if there is an error during the connection attempt, and it will log the error message.
.catch((err) => {
console.log('MongoDB connection error:', err);
});

// Use routes
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set in .env
// Start the server and listen on the specified port
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});