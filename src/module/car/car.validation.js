import joi from "joi";  
import { carTypes } from "../../common/constant/index.js";


export const insertCarVal = joi.object({
    brand:joi.string().required(), 
    model: joi.string().required(),
    color: joi.string().required(),
    type: joi.string().valid(...Object.values(carTypes)).required(),
    plateNumber: joi.string().required(),

    year: joi.number().required()
})
