import nodemailer from "nodemailer"
import fs from "fs";
import path from "path";
export const sendEmail = async ({ to, subject, otp }) => {
    
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: 'social-media 👻', // sender address
        to, // list of receivers
        subject, // Subject line
        html: `<h1>your OTP is : ${otp}</h1>`// html body
    });

}