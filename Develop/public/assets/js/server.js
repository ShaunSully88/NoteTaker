const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public/'));
const { notes } = require('./db/db')

function handleNewNoteView(body, notesArray) {
    const note = body;

    notesArray.push(note)

    fs.writeFileSync(
        path.join()
        //answer here//)
        JSON.stringify({ note: noteArray}, null, 1)
    );

    return note;
}

app.get('/api/notes', (req, res) => {

    let results = notes;

    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/notes', (req, res) => {

    req.body.id = notes.length.toString();

    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {

    const note = handleNewNoteView(req.body, notes);
    
    res.json(note);
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