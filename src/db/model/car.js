import { model, Schema } from "mongoose";
import { carTypes } from "../../common/constant/index.js";


const carSchema = new Schema({

    brand: { type: String, required: true },
    model: { type: String, required: true },
    year : { type: Number, required: true },

    color: { type: String, required: true },
    type: { type: String, enum:Object.values(carTypes), required: true },
    
    plateNumber : { type: String, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }


}, { timestamps: true })

export const Car = model("Car", carSchema)