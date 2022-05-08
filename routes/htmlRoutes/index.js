const router = require('express').Router();
const path = require('path');

//sends to note.html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});
// wildcard path, defaults to index.html page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

module.exports = router;