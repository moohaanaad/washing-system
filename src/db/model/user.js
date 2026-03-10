import { Schema, model } from "mongoose";
import { hashPassword } from "../../utils/bcrypt/index.js";
import { genderTypes } from "../../common/constant/user.js";

const userSchema = new Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    phone: { type: String, unique: true, required: true },
    gender: { type: String, enum: Object.values(genderTypes), required: true },
    address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        homeLocation: { type: String, required: true }
    },
    otherLocation: { type: String },

    isConfirmed: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },

}, { timestamps: true })

// --- hocks ---
userSchema.pre("save", function () {
    //isModified => check if password was changed
    if (this.isModified("password")) this.password = hashPassword(this.password)
})

export const User = model("User", userSchema)