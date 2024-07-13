// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sendEmail = require('../sendMail');

// GET /api/v1/users - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/v1/users - Create a new user
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = new User({
        name,
        email,
        password,
        role
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;
