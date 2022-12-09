const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Note = require('../models/Note');

const { body, validationResult } = require('express-validator');

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// ROUTES 1: Fetch All Notes using: GET "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // res.send([]);
});

// ROUTES 2: Add a new Note using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // If any field is empty
    if (!title || !description || !tag) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;