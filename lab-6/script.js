document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');

    const loadCars = () => {
        fetch(`${API_URL}/cars`)
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

    // Load cars initially
    loadCars();
});
