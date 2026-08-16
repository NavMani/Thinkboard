import express from "express";
import {createNote, deleteNote, getNote, updateNote, getNoteById} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getNote);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;