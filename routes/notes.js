const express = require('express')
const Note = require('../models/NoteModel')

const {createNote, updateNote, deleteNote, getNote, getNotes} = require('../controllers/noteController')
const requireAuth = require('../middleware/requreAuth')
const router = express.Router()

router.use(requireAuth)
// get all data
router.get('/', getNotes)
    
// get a single data
router.get('/:id', getNote)

// post request
router.post('/', createNote)

// patch request
router.patch('/:id', updateNote)

// delete request
router.delete('/:id', deleteNote)


module.exports = router