const { default: mongoose } = require("mongoose");
const Note = require("../models/NoteModel");

// get all data
const getNotes = async (req, res) => {
  try {
    const user_id = req.user._id;
    const note = await Note.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get a data
const getNote = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "There is no such thing" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ msg: "There is no such thing" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a Data
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "There is no such thing" });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ msg: "There is no such thing" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update Data
const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "There is no such thing" });
    }

    const note = await Note.findByIdAndUpdate(id);

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// post data

const createNote = async (req, res) => {
  const { title, info } = req.body;
  try {
    const user_id = req.user._id;
    const note = await Note.create({ title, info, user_id });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createNote, updateNote, deleteNote, getNote, getNotes };
