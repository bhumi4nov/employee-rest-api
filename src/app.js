require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();
connectDB();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: 'Too many requests, please try again later.'
    }
});

app.use(limiter);

app.use('/api/employees', employeeRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running'
    });
});

// Centralized Error Handling
app.use((err, req, res, next) => {

    console.log("CENTRAL ERROR HANDLER HIT");
    console.error(err);

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid employee ID'
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: 'Email already exists'
        });
    }

    res.status(500).json({
        message: 'Internal server error'
    });

});

module.exports = app;