// index.js

const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
