import randomstring from 'randomstring'
import { roleTypes } from "../../common/constant/index.js"
import { messages } from "../../common/messages/message.js"
import { Otp } from "../../db/model/otp.js"
import { User } from "../../db/model/user.js"
import { comparePassword, hashPassword } from "../../utils/bcrypt/index.js"
import { errorResponse, successResponse } from "../../utils/res/index.js"
import { sendEmail } from "../../utils/sendEmail.js"
import { generateToken } from "../../utils/token/generate.js"
import { verifyToken } from "../../utils/token/verify.js"
import { AppError } from '../../utils/error/appError.js'

export const sendOtpToEmail = async (email) => {
    //check Existence 
    const userOTP = await Otp.findOne({ email })
    if (userOTP) throw new AppError(messages.OTP.haveOTP, 400)

    //send email
    const otp = randomstring.generate({ length: 5, charset: "numeric" })
    await Otp.create({ email, otp })
    await sendEmail({
        to: email,
        subject: "washing system OTP",
        otp
    })
}

//signup
export const signup = async (body) => {

    const { email, phone } = body

    //check existence
    const userExist = await User.findOne({ $or: [{ email }, { phone }] })
    if (userExist?.email == email) throw new AppError(messages.user.email, 400)
    if (userExist?.phone == phone) throw new AppError(messages.user.phone, 400)

    //save acc
    const createdUser = await User.create(body)

    //send email
    await sendOtpToEmail(email)


}

//resend OTP message
export const resendOTP = async (email) => {

    await sendOtpToEmail(email)

}

//verify
export const verify = async (body) => {
    const { email, otp } = body

    // check otp existence
    const otpExist = await Otp.findOne({ email })
    if (!otpExist) throw new AppError(messages.OTP.expiredOTP, 400)
    if (otp !== otpExist.otp) throw new AppError(messages.OTP.invalidOTP, 401)

    //check user existence
    const updatedUser = await User.findOne({ email })
    if (!updatedUser) throw new AppError(messages.user.notFound, 404)
    if (updatedUser.isConfirmed) throw new AppError(messages.user.alreadyVerified, 400)

    //preapre data
    updatedUser.isConfirmed = true
    otpExist.distroyedAt = new Date();
    await otpExist.save();
    //update user
    await updatedUser.save()
    

}

//login
export const login = async (body) => {
    let { email, password } = body

    const userExist = await User.findOne({ email })
    if (!userExist) throw new AppError(messages.user.invaledLogin, 404)
    if (userExist?.isConfirmed == false) throw new AppError(messages.user.notConfirmed, 403)

    const comparedPassword = await comparePassword(password, userExist.password)
    if (!comparedPassword) throw new AppError(messages.user.invaledLogin, 404)

    //prepare data 
    const access_token = generateToken({
        payload: { _id: userExist._id },
        opption: { expiresIn: "1h" }

    })
    const refresh_token = generateToken({
        payload: { _id: userExist._id },
        opption: { expiresIn: "7d" }
    })
    userExist.isActive = true
    await userExist.save()

    return {
            access_token,
            refresh_token
        }
}

//refresh token
export const refreshToken = async (body) => {

    const { refresh_token } = body
    
    //verify token 
    const result = verifyToken({ token: refresh_token })
    if (result?.error) throw new AppError(result.error, 400)

    const userExist = await User.findById(result._id).lean()
    if (!userExist) throw new AppError(messages.user.notFound, 404)
    if (userExist?.isConfirmed == false) throw new AppError(messages.user.notConfirmed, 403)

    //generate token 
    const accessToken = generateToken({
        payload: { _id: result._id },
        opption: { expiresIn: '1h' }
    })

    return {
            access_token: accessToken
        }
}

// forget password
export const forgetPassword = async (body) => {
    const { email } = body

    //check existence
    const userExist = await User.findOne({ email })
    if (!userExist) throw new AppError(messages.user.notFound, 404)
    if (userExist.isConfirmed == false) throw new AppError(messages.user.notConfirmed, 403)

    //send otp email
    await sendOtpToEmail(email)

    //prepare data and save
    userExist.isActive = false
    userExist.isConfirmed = false
    await userExist.save()
    }

//change password
export const changePassword = async (body) => {
    const { email, otp, password } = body

    //check existence
    const otpExist = await Otp.findOne({ email, otp })
    if (!otpExist) throw new AppError(messages.OTP.invalidOTP, 409)
    const userExist = await User.findOne({ email })
    if (!userExist) throw new AppError(messages.user.notFound, 404)

    //prepare data
    userExist.password = password
    userExist.isActive = false

    //save data 
    await userExist.save()
    await Otp.deleteOne({ email, otp })
}