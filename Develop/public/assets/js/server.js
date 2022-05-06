const apiRoutes = require ('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)
app.use(express.static('public'));
const { notes } = require('./db/db.json')



app.listen(PORT, () => {

    console.log(`API Server now on port ${PORT}!`);
});