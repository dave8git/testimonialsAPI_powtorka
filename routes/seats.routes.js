const express = require('express'); 
const router = express.Router(); 
const db = require('../db'); 
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    var length = db.seats.length; 
    var index = Math.floor(Math.random() * length);
    var randomObject = db.seats[index];
    res.json(randomObject);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find(elemet => elemet.id === req.params.id));
});

router.route('/seats').post((req, res) => {
    const day = req.body.day;
    const seat = req.body.seat;
    const client = req.body.client;
    const email = req.body.email;
    const id = uuidv4();
    db.seats.push({id: id, day: day, seat: seat, client: client, email: email });
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const { id } = req.params;
    const { day, seat, client, email } = req.body;
    const index = db.seats.findIndex(object => object.id == id);
    console.log(index);
    if (index != -1) {
        db.seats[index].day = day;
        db.seats[index].seat = seat;
        db.seats[index].client = client;
        db.seats[index].email = email;

        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: "This seat doesn not exit"});
    }
});

router.route('/seats/:id').delete((req, res) => {
    const { id } = req.params;
    const index = db.seats.findIndex(object => object.id == id);
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router; 
