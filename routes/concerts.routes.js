const express = require('express'); 
const router = express.Router(); 
const db = require('../db'); 
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    var length = db.concerts.length;
    var index = Math.floor(Math.random()*length);
    var randomObject = db.concerts[index];
    res.json(randomObject);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find(element => element.id === req.params.id));
});

router.route('/concerts').post((req, res) => {
    const author = req.body.author;
    const text = req.body.text;
    const id = uuidv4(); 
    db.concerts.push({id: id, author: author, text: text});
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    const { id } = req.params; 
    const { author, text } = req.body; 

    const index = db.concerts.findIndex(object => object.id == id);
    console.log(index);
    if(index != -1) {
        db.concerts[index].author = author;
        db.concerts[index].text = text;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: "This concert does not exist"});
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const { id } = req.params;
    const index = db.concerts.findIndex(object => object.id == id);
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;