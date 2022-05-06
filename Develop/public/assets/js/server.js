const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
const { notes } = require('db/db.json')

app.get("/api/notes", (req, res) => {
    const results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if(!validateNotes(req.body)) {
        res.status(400).json('Note could not be saved');
    } else {}
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {

    console.log(`API Server now on port ${PORT}!`);
});