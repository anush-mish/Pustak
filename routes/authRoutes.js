// routes/authRoutes.js

import { Router } from 'express';
const router = Router();
import { login, signup } from '../controllers/authController.js'

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router   