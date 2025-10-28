import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.route("/")
  .get(getAllNotes)
  .post(createNote);

router.route("/:id")
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

export default router;
