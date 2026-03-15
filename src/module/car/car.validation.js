import joi from "joi";
import { carTypes } from "../../common/constant/index.js";


const carSchema = {
    brand: joi.string(),
    model: joi.string(),
    color: joi.string(),
    type: joi.string().valid(...Object.values(carTypes)),
    plateNumber: joi.string(),
    year: joi.number()
}

export const createCarSchema = joi.object({
    brand: carSchema.brand.required(),
    model: carSchema.model.required(),
    color: carSchema.color.required(),
    type: carSchema.type.required(),
    plateNumber: carSchema.plateNumber.required(),
    year: carSchema.year.required()

})

export const updateCarSchema = joi.object({
    carId: joi.string().required(),
    brand: carSchema.brand,
    model: carSchema.model,
    color: carSchema.color,
    type: carSchema.type,
    plateNumber: carSchema.plateNumber,
    year: carSchema.year
})
