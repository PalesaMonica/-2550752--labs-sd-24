const cars = [
    {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2022,
        price: 250000
    },
    {
        id: 2,
        make: "Honda",
        model: "Accord",
        year: 2021,
        price: 200000
    },
    {
        id: 3,
        make: "Ford",
        model: "Mustang",
        year: 2020,
        price: 300000
    }
];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    switch (req.method) {
        case 'GET':
            await getCars(context);
            break;
        case 'POST':
            await addCar(context, req.body);
            break;
        case 'DELETE':
            await deleteCar(context, req.params.id);
            break;
        default:
            context.res = {
                status: 405,
                body: "Method Not Allowed"
            };
            break;
    }
}

async function getCars(context) {
    try {
        context.res = {
            status: 200,
            body: cars
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}

async function addCar(context, newCar) {
    try {
        // Generate unique id for the new car
        const id = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
        newCar.id = id;
        cars.push(newCar);
        context.res = {
            status: 201,
            body: newCar
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}

async function deleteCar(context, id) {
    try {
        const index = cars.findIndex(car => car.id == id);
        if (index !== -1) {
            const deletedCar = cars.splice(index, 1)[0];
            context.res = {
                status: 200,
                body: deletedCar
            };
        } else {
            context.res = {
                status: 404,
                body: "Car not found"
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}
