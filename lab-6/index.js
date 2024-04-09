const express = require('express');
const app = express();
const path = require('path'); // Require the path module

// Use environment variable for port binding
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Require the cars.json file
const cars = require('./cars.json');

// Define API URL environment variable
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Define root route to serve index.html
app.get('/', (req, res) => {
    // Serve the index.html file directly
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// GET car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

// PUT update car by id
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

// DELETE car by id
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

// POST add new car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.json(newCar);
});

// Serve static files (assuming index.html is in the same directory)
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at ${API_URL}`);
});
