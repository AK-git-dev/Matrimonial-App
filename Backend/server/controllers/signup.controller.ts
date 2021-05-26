import {Router} from "express";
import {
    createError ,
    generateAuthToken ,
    generateOtpAndTokenHash ,
    generateRefreshToken ,
    Next ,
    RequestInterface ,
    ResponseInterface ,
    sendAuthenticatedResponseWhenVerificationCompletes ,
    setAuthorizationHeader ,
    SUCCESS ,
} from "../utils";
import {PhoneNumberSignupInterface} from "../models";
import {Schema} from "../../database/schema";
import {requiresOtpVerification} from "../utils/middlewares/otp-verify.middleware";

const router = Router ();

// [POST] : When User is going to create account for the first time USING TWILIO CRED
router.post (
    "/" ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        async function checkPhoneNumberAlreadyExists(payload: PhoneNumberSignupInterface) {
            const isPhoneNumberRegisted = await Schema.User.findOne ({where :{phoneNumber :payload.phoneNumber}})
            if (isPhoneNumberRegisted !== null) throw new createError.Conflict ('You have an registered account already! Please Sign in!')
        }

        try {
            const payload: PhoneNumberSignupInterface = req.body as PhoneNumberSignupInterface;
            // If User already have verified account
            const isUserVerified = await Schema.User.findOne ({
                where :{phoneNumber :payload.phoneNumber} ,
            });
            if (isUserVerified)
                throw new createError.Conflict (
                    `you already have an account! Please log into your account`
                );

            await checkPhoneNumberAlreadyExists (payload);

            // if (status === undefined) {
            //   // delete from preflight accounts
            //   await Schema.Prefight.destroy({
            //     where: { phoneNumber: payload.phoneNumber },
            //   });
            //   const resp = await Schema.Prefight.create(payload);
            //   const magicToken = generateMagicToken(resp);

            const ifTokenGenerated = await generateOtpAndTokenHash (payload.phoneNumber);
            if (typeof (ifTokenGenerated) === 'undefined') throw new createError.RequestTimeout (`Secure OTP could not be generated! Check your network connection`);

            return res.status (200).send ({
                ...SUCCESS ,
                otpCode :ifTokenGenerated.otp ,
                message :`Your one time password for Matrimony-Match ${ifTokenGenerated.otp}. OTP valid for only 2 minutes!` ,
                xMagicToken :ifTokenGenerated.xMagicToken ,
                otpValidity :"2 minutes" ,
            });
        } catch
            (error) {
            next (error);
        }
    }
)


// [POST] : Verify user account using OTP CODE generated
router.post (
    "/account/verify/otp" ,
    requiresOtpVerification ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const {phoneNumber} = req.body;
            // OTP has been verified &&
            // send the ACK to the client to proceed with profile building part

            const resp = await Schema.User.create ({phoneNumber});
            const accessToken: string = generateAuthToken (resp);
            const refreshToken: string = generateRefreshToken (resp);
            setAuthorizationHeader (res , accessToken);

            // Store refresh Token for Future Authentication
            await Schema.RefreshToken.create ({token :refreshToken});

            return sendAuthenticatedResponseWhenVerificationCompletes (res , accessToken , refreshToken , resp , phoneNumber);
        } catch (e) {
            next (e);
        }
    }
);

export default router;
