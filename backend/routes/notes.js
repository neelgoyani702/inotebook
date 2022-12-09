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

// ROUTES 3: Update an existing Note using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    const note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") };
    // const note = Note.findByIdAndUpdate(req.params.id); 

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }   
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
    }
});
module.exports = router;