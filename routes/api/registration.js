const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   POST api/registration
// @desc    Register a new user
// @access  Public 
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    });
});