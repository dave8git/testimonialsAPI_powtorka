const express = require('express');
const db = require("./db");
const path = require('path');
const cors = require('cors');

const app = express(); 

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
    res.json(db);
});


app.listen(9000, () => {
    console.log('Server is running on port: 9000');
});