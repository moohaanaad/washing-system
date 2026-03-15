import { messages } from "../../common/messages/message.js"
import { successResponse } from "../../utils/res/index.js"
import * as carService from "./car.service.js"

// add car
export const addCar = async (req, res, next) => {

    const data =await carService.addCar(req.body, req.user._id)

    return successResponse({
        res, 
        message: messages.car.createdSuccessfully,
        data,
        statusCode: 201
    })
} 

// update car
export const updateCar = async (req, res, next) => {

    const data = await carService.updateCar(req.params.carId, req.body, req.user._id)

    return successResponse({
        res, 
        message: messages.car.updatedSuccessfully,
        data,
        statusCode: 201
    })
}

// get all cars of user
export const getAllCars = async (req, res, next) => {
    const data = await carService.getAllCars(req.user._id)

    return successResponse({
        res, 
        message: messages.car.getAll,
        data,
        statusCode: 201
    })
}

// get specific car of user
export const getSpecificCar = async (req, res, next) => {
    const data = await carService.getSpecificCar(req.params.carId, req.user._id)

    return successResponse({
        res, 
        message: messages.car.getSpecific,
        data,
        statusCode: 201
    })
}

// get all cars of user
export const deleteCar = async (req, res, next) => {
    const data = await carService.deleteCar(req.params.carId, req.user._id)

    return successResponse({
        res, 
        message: messages.car.deletedSuccessfully,
        data,
        statusCode: 201
    })
}