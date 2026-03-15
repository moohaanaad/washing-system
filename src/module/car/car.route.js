import { Router } from 'express'
import { asyncHandler, isAuthenticate, isValid } from '../../middleware/index.js'
import * as carController from './car.controller.js'
import * as carVal from './car.validation.js'


const carRouter = Router()

//is authenticated
carRouter.use(isAuthenticate())

//add car 
carRouter.post('/add',
    isValid(carVal.createCarSchema),
asyncHandler(carController.addCar)
)

//get all car 
carRouter.get('/all',
asyncHandler(carController.getAllCars)
)

//get specific car
carRouter.get('/:carId',
asyncHandler(carController.getSpecificCar)
)
//update car 
carRouter.put('/:carId',
    isValid(carVal.updateCarSchema),
asyncHandler(carController.updateCar)
)

//add car 
carRouter.delete('/:carId',
asyncHandler(carController.deleteCar)
)

export default carRouter