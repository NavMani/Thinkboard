import Note from "../models/Note.js";


export async function getNote(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("GET NOTES ERROR:");
    console.error(error);

    res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
      stack: error.stack, // temporarily add this for debugging
    });
  }
}

export async function getNoteById(req, res) {
   try {
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
   } catch (error) {
    res.status(500).json({ message: "Error retrieving note", error });
   }
}

export async function createNote(req, res) {
   try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json({ message: "Note created successfully", note: savedNote });
   } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
   }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error });
    }   
}