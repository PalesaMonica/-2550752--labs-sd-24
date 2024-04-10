const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const cars = require('./cars.json');

// Set API_URL to the local server address
const API_URL = `http://localhost:${PORT}`;

// Define CORS options
const corsOptions = {
    origin: ['http://localhost:3001', 'https://lab6webapp.azurewebsites.net']
};

// Use CORS middleware with options
app.use(cors(corsOptions));

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

app.listen(PORT, () => {
    console.log(`Server started at ${API_URL}`);
});
