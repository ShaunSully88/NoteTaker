const router = require('express').Router();
const { filterByQuery, findById, createNewNote } = require('../../public/assets/js/index');
const { notes } = require('../../data/notes.json');

//getRoute for notes page
router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//get route for specific note on note page
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//postRoute for writing note to note page
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if(!validateNote(req.body)) {
        res.status(400).json('Note is not properly formatted. Please enter again.');
    } else {
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

module.exports = router;