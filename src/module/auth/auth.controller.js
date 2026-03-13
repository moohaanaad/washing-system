import { messages } from "../../common/messages/message.js";
import { successResponse } from "../../utils/res/res.success.js";
import * as authService from "./auth.service.js"

//signup
export const signup = async (req, res, next) => {

  await authService.signup(req.body);

  return successResponse({
    res,
    message: messages.user.signupSuccess,
    statusCode: 200
  });

};

//resend OTP message
export const resendOTP = async (req, res, next) => {

  await authService.resendOTP(req.body.email)

  return successResponse({
    res,
    message: messages.user.login,
    statusCode: 200
  })
}

//verify
export const verify = async (req, res, next) => {

  await authService.verify(req.body)

  return successResponse({
    res,
    message: messages.user.verfiedSuccessfully,
    statusCode: 200
  })
}

//login
export const login = async (req, res, next) => {

  const data = await authService.login(req.body)

  return successResponse({
    res,
    message: messages.user.login,
    data,
    statusCode: 200
  })
}

//refresh token
export const refreshToken = async (req, res, next) => {

  const data = await authService.refreshToken(req.body)

  return successResponse({
    res,
    message: messages.token.refreshToken,
    data,
    statusCode: 200
  })
}

// forget password
export const forgetPassword = async (req, res, next) => {

  await authService.forgetPassword(req, res, next)

  return successResponse({
    res,
    statusCode: 200,
    message: messages.OTP.OTPSent
  })
}

//change password
export const changePassword = async (req, res, next) => {

  await authService.changePassword(req, res, next)

  return successResponse({
    res,
    message: messages.user.changedPasswordSuccessfully,
    statusCode: 200,
  })

}