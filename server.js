const express = require('express');
//const db = require("./db");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

const app = express(); 

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', seatsRoutes); // add seats routes to server

// const db = [
//     { id: "1", author: 'John Doe', text: 'This company is worth every coin!' },
//     { id: "2", author: 'Amanda Doe', text: 'They really know how to make you happy.' },
//   ];



app.use((req, res) => {
    res.status(404).send('404 not found ...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
