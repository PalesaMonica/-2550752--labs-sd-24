const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

// Use environment variable for port binding
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Use the CORS middleware
app.use(cors());

const cars = require('./cars.json');

// Define API URL environment variable
const API_URL = process.env.API_URL || 'http://localhost:3001';

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at ${API_URL}`);
});
