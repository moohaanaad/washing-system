import joi from "joi";
import { genderTypes } from "../../common/constant/index.js";


export const signupVal = joi.object({
    firstname: joi.string().min(3).max(30).required(),
    lastname: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    phone: joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
    password: joi.string().min(8).max(32).pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:"\\\\|,.<>/?]).+$')
    ).required(),
    gender: joi.string().valid(...Object.values(genderTypes)),
    address: joi.object({
        city: joi.string().required(),
        street: joi.string().required(),
        homeLocation: joi.string().required()
    })
})

//login
export const signinVal = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    deviceId: joi.string().required()
})

// refresh token
export const refreshToken = joi.object({
    refresh_token: joi.string().required(),
    deviceId: joi.string().required()
})

export const vrefiy = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().required()
})

export const forgetPassword = joi.object({
    email: joi.string().email().required()
})


export const changePassword = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().required(),
    password: joi.string().required(),
    repassword: joi.string().valid(joi.ref('password')),
})