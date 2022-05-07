const router = require('express').Router();
const path = require('path');
// sends to index.html page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//sends to note.html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// wildcard path, defaults to index.html page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});