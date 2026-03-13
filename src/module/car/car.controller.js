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