const { Schema, model } = require("mongoose");


const userSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: String, required: true, unique: true },

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
userSchema.pre("save", function (next) {
    //isModified => check if password was changed
    if (this.isModified("password")) this.password = hashPassword(this.password)
    if (!this.code) this.code = randomstring.generate(7)

    return next()
})

export const User = model("User", userSchema)