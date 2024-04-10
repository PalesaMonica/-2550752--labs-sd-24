document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');

    // Set API URL dynamically based on the environment
    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://lab6webapp.azurewebsites.net';// Empty string as API URL will be determined by the hosting environment

    // Function to load cars
    const loadCars = () => {
    let apiUrl = 'api/cars'; // Relative URL for the API endpoint

    // Check if the hostname is localhost, then use the local server URL
    if (window.location.hostname === 'localhost') {
        apiUrl = 'http://localhost:3001/api/cars'; // Assuming your local server runs on port 3001
    } else {
        // For other hostnames (e.g., Azure URL), use the appropriate URL
        apiUrl = 'https://lab6webapp.azurewebsites.net/api/cars';
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            carList.innerHTML = '';
            data.forEach((car, index) => {
                const carCard = createCarCard(car, index);
                carList.appendChild(carCard);
            });
        })
        .catch(error => {
            console.error('Error fetching car data:', error);
        });
};

    // Function to create a car card
    const createCarCard = (car, index) => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        carCard.innerHTML = `
            <h2>${car.make} ${car.model}</h2>
            <p><strong>Year:</strong> ${car.year}</p>
            <p><strong>Make:</strong> ${car.make}</p>
            <p><strong>Model:</strong> ${car.model}</p>
            <p><strong>Color:</strong> ${car.color}</p>
            <p><strong>Price:</strong> R${car.price}</p>
            <button class="btn btn-remove" data-index="${index}">Remove</button>
        `;
        return carCard;
    };

    // Event delegation for remove buttons
    carList.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            const index = event.target.dataset.index;
            removeCar(index);
        }
    });

    // Function to remove a car
    const removeCar = (index) => {
        const carId = index; // Assuming the index is the ID of the car
        fetch(`${API_URL}/cars/${carId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete car');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            loadCars(); // Reload cars after removal
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Form submission to add a new car
    const carForm = document.getElementById('carForm');
    carForm.addEventListener('submit', event => {
        event.preventDefault();
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const color = document.getElementById('color').value;
        const price = document.getElementById('price').value;

        const newCar = { make, model, year, color, price };

        fetch(`${API_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add car');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            loadCars(); // Reload cars after addition
            carForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Load cars initially
    loadCars();
});
