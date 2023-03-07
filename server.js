const express = require('express');
//const db = require("./db");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

const app = express(); 

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
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

app.get('/testimonials/random', (req, res) => {
    var length = db.length;
    console.log(length);
    var index = Math.floor(Math.random() * length);
    console.log(index);
    var randomObject = db[index];
    console.log(randomObject);
    res.json(randomObject);
});

app.post('/testimonials', (req, res) => {
    const author = req.body.author;
    const text = req.body.text;
    const id = uuidv4();
    db.push({id: id, author: author, text: text});
    res.json({ message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;

    const index = db.findIndex(object => object.id == id);
    console.log(index);
    if (index != -1) {
        db[index].author = author;
        db[index].text = text;
        res.json({ message: 'OK'});
    } else {
        res.status(404).json({ message: "This testimony does not exist"});
    }
});



app.listen(9000, () => {
    console.log('Server is running on port: 9000');
});