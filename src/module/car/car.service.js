import { messages } from "../../common/messages/message.js"
import { Car } from "../../db/model/car.js"

// add car
export const addCar = async (body, userId) => {

    const carExist = await Car.findOne({ vin: body.vin, owner: userId })
    if (carExist) {
        throw new Error(messages.car.alreadyExist, 400)
    }
    body.owner = userId
    const insertedCar = await Car.create(body)

    return insertedCar
}

//update car 
export const updateCar = async (carId, body, userId) => {

    const { brand, model, year, color, type, plateNumber } = body

    const carExist = await Car.findOne({ _id: carId, owner: userId })
    if (!carExist) {
        throw new Error(messages.car.notFound, 404)
    }
    if (body.vin) {
        const vinExist = await Car.findOne({ vin: body.vin })
        if (vinExist) {
            throw new Error(messages.car.alreadyExist, 400)
        }
        carExist.vin = body.vin
    }

    //prepare data
    const updateableFields = {
        brand,
        model,
        year,
        color,
        type,
        plateNumber
    };

    //change data
    for (const [key, value] of Object.entries(updateableFields)) {
        if (value !== undefined && value !== "" && value.length !== 0) {
            carExist[key] = value;
        }
    }


    await carExist.save()

    return carExist
}

export const deleteCar = async (carId, userId) => {
    const carExist = await Car.findOne({ _id: carId, owner: userId })
    if (!carExist) {
        throw new Error(messages.car.notFound, 404)
    }       
    await Car.deleteOne({ _id: carId })
}
