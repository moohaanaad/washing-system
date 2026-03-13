import { Router } from "express"
import { asyncHandler, isValid } from "../../middleware/index.js"
import * as authController from "./auth.controller.js"
import * as val from "./auth.validation.js"

const authRouter = Router()

//create account
authRouter.post('/signup', isValid(val.signupVal), asyncHandler(authController.signup))

//signin
authRouter.put('/login', isValid(val.signinVal), asyncHandler(authController.login))

//verify
authRouter.patch('/verify-account', asyncHandler(authController.verify))

//resend OTP
authRouter.patch('/resend', asyncHandler(authController.resendOTP))

// refresh token
authRouter.patch('/refresh-token',
    isValid(val.refreshTokenVal), asyncHandler(authController.refreshToken))

//forget password
authRouter.patch('/forget-password', isValid(val.forgetPasswordVal), asyncHandler(authController.forgetPassword))

//change password
authRouter.put('/change-password', isValid(val.changePasswordVal), asyncHandler(authController.changePassword))


export default authRouter