const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

router.post(
  "/addnote",
  [
    body("title", "Enter a valid name ").isLength({ min: 3 }),
    body("description", "description must be of 5 character").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);


router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
  // Create a newNote object
  const newNote  = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note});
  
  })

  router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // Create a newNote object
    
  
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
  
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
  
    note = await Note.findByIdAndDelete (req.params.id, {new:true})
    res.json({"Success":"Note has been deleted",note:note});
    
    })

module.exports = router;
