const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1 : Creat a User Using : POST "/api/auth/createuser". No login Required
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors , Return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // .then(user => res.json(user)).
        // catch(err => {console.log(err)
        //     res.json({error: 'Please enter a unique value for email',message: err.message})
        // });


        // Create a JWT token and return
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); // JWT_SECRET is a string
        // res.json(user);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 2 : Authenticate a User Using : POST "/api/auth/login". No login Required
router.post('/login', [
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // If there are errors , Return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); // JWT_SECRET is a string
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTE 3 : Get LoggedIn User Details Using : POST "/api/auth/getuser". Login Required

router.post('/getuser', fetchUser,
    async (req, res) => {
        // res.send("Hello World from the Auth.js");
        try {
            const user = await User.findById(req.user.id).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }

    });

module.exports = router;