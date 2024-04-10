const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001 ;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

const cars = require('./cars.json');

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
    console.log(`Server started at http://localhost:${PORT}`);
});
