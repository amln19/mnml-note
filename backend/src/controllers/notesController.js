import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getAllNotes controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).json({ message: "Title and content cannot be empty" });
    }
    
    const newNote = new Note({ title: title, content: content });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    
    const { title, content } = req.body;
    
    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).json({ message: "Title and content cannot be empty" });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
      },
      {
        new: true,
      }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
