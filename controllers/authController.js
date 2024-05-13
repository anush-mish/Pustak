// controllers/authController.js

import bcrypt from 'bcryptjs';
import User from '../User.js'
export const signup = async (req, res) => {
    
    try {
        const { username, password } = req.body;
        console.log(username, password);
        if(!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields', success: false });
        }
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully', sussess: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const login = async (req, res) => {
    
    try {
        const { username, password } = req.body;
        if(!username || !password) {    
            return res.status(400).json({ msg: 'Please enter all fields', success: false });
        }
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
