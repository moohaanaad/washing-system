import { Router } from 'express'
import { asyncHandler, isAuthenticate } from '../../middleware/index.js'
import * as carController from './car.controller.js'


const carRouter = Router()

//is authenticated
carRouter.use(isAuthenticate())

//add car 
carRouter.post('/add',
asyncHandler(carController.addCar)
)

export default carRouter