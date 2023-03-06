const express = require('express');
//const db = require("./db");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

const app = express(); 

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(cors());

const db = [
    { id: "1", author: 'John Doe', text: 'This company is worth every coin!' },
    { id: "2", author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find(element => element.id === req.params.id));
});

app.post('/testimonials', (req, res) => {
    const author = req.params.author;
    const text = req.params.text;
    const id = uuidv4();
    db.push({id: id, author: author, text: text});
    res.json({ message: 'OK'});
});


app.listen(9000, () => {
    console.log('Server is running on port: 9000');
});