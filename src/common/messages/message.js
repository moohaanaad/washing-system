import { get } from "http";

const generateMessageKeys = (entity) => ({
    notFound: `${entity}.notFound`,
    alreadyExist: `${entity}.alreadyExist`,
    failToCreate: `${entity}.failToCreate`,
    failToUpdate: `${entity}.failToUpdate`,
    createdSuccessfully: `${entity}.createdSuccessfully`,
    updatedSuccessfully: `${entity}.updatedSuccessfully`,
    getAll: `${entity}.getAll`,
    getSpecific: `${entity}.getSpecific`,
    changedPasswordSuccessfully: `${entity}.changedPasswordSuccessfully`,
    changedEmailSuccessfully: `${entity}.changedEmailSuccessfully`,
    deletedSuccessfully: `${entity}.deletedSuccessfully`,
    invalid: `${entity}.invalid`,
});

export const messages = {
    user: {
        ...generateMessageKeys("user"),
        phone: "user.phone",
        email: "user.email",
        notConfirmed: "user.notConfirmed",
        alreadyVerified: "user.alreadyVerified",
        verifiedSuccessfully: "user.verifiedSuccessfully",
        invaledLogin: "user.invaledLogin",
        invaledDeviceId: "user.invaledDeviceId",
        login: "user.login",
        signupSuccess: "user.signupSuccess",
        setPasswordSuccessfully: "user.setPasswordSuccessfully",
        invalidcrendential: "user.invalidcrendential",
        verfiedSuccessfully: "user.verfiedSuccessfully",
        profileFetchSuccessfully: "user.profileFetchSuccessfully"
    },
    image: {
        uploaded: "image.uploaded",
        invalidImage: "image.invalidImage",
        notFoundImage: "image.notFoundImage"
    },
    OTP: {
        haveOTP: "OTP.haveOTP",
        expiredOTP: "OTP.expiredOTP",
        OTPSent: "OTP.OTPSent",
        invalidOTP: "OTP.invalidOTP"
    },
    token: {
        invalid: "token.invalid",
        unauthenticate: "token.unauthenticate",
        unauthorized: "token.unauthorized",
        refreshToken: "token.refreshToken"
    },
    car:{
        ...generateMessageKeys("car")
    },
    notAuthorized: "general.notAuthorized",
    internalServicerError: "general.internalServicerError"
};