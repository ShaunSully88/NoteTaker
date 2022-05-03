const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
const { notes } = require('./db/db.json')

app.get("/api/notes", (req, res) => {
    const readFile = JSON.parse(
      fs.readFileSync("db/db.json", {
        encoding: "utf-8",
      })
    );
    res.json(readFile);
});

app.post('/api/notes', (req, res) => {

    const readFile = JSON.parse(
        fs.readFileSync('db/db.json', {
            encoding: 'utf-8',
        })
    );
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