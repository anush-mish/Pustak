// routes/authRoutes.js

const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', [
    check('username', 'Please enter a valid username').notEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], authController.signup);

// Login route
router.post('/login', [
    check('username', 'Please enter a valid username').notEmpty(),
    check('password', 'Please enter a password').exists()
], authController.login);

module.exports = router;
