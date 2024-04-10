const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));
const cars = require('./cars.json');

const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Lucky-Lot Cars API!');
});

// Route handlers for your cars API
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Route handler to get a specific car by ID
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ error: 'Car not found' });
    }
});

// Route handler to add a new car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Route handler to update a car by ID
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars[index] = updatedCar;
        res.json(updatedCar);
    } else {
        res.status(404).json({ error: 'Car not found' });
    }
});

// Route handler to delete a car by ID
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        const deletedCar = cars.splice(index, 1)[0];
        res.json({ message: `Car with ID ${id} deleted`, car: deletedCar });
    } else {
        res.status(404).json({ error: 'Car not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${API_URL}`);
});
